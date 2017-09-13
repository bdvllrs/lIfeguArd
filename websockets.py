from hashlib import sha256
from app.db import users, update_settings, settings


def is_connected(app, sid):
    return sid in app['io_users']


def websockets(app, sio):
    @sio.on('disconnect')
    async def on_disconnect(sid):
        print(sid, 'disconnecting')
        if is_connected(app, sid):
            app['io_users'].remove(sid)
            sio.leave_room(sid, 'connected_users')

    @sio.on('login')
    async def on_login(sid, data):
        """
            Check if the login / password is correct
            """
        # username, password = data['username'], data['password']
        # password += app['config']['security']['salt']
        async with app['db'].acquire() as conn:
            # result = await conn.execute(users.select().where(users.c.username == username))
            # record = await result.first()
            # # If the password is correct...
            # if record is not None and sha256(password.encode()).hexdigest() == record.password:
            app['io_users'].append(sid)
            sio.enter_room(sid, 'connected_users')
            print(sid, 'connected')
            await sio.emit('loginReply', 'ok', room=sid)
            req = await conn.execute(settings.select().where(settings.c.name == 'recording'))
            res = await req.first()
            await sio.emit('isRecordingInfo', bool(int(res.content)), room=sid)
            # else:
            #     await sio.emit('loginReply', 'no', room=sid)

    @sio.on('settingsNeeded')
    async def on_settings_needed(sid):
        if is_connected(app, sid):
            async with app['db'].acquire() as conn:
                req = await conn.execute(settings.select())
                res = await req.fetchall()
            sets = {}
            for r in res:
                sets[r[1]] = r[2]
            await sio.emit('settingsNeededReply', sets)

    @sio.on('settingsUpdated')
    async def on_settings_update(sid, data):
        """
            When the settings are updated
            """
        if is_connected(app, sid):
            await update_settings(app, data['id'], data['content'])
            await sio.emit('settingsUpdatedReply', data)

    @sio.on('isRecordingUpdated')
    async def on_is_recording_updated(sid, data):
        """
        When we press the record button
        """
        if is_connected(app, sid):
            await update_settings(app, 'recording', data)
            await sio.emit('isRecordingInfo', data, room='connected_users')
