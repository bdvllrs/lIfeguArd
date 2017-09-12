from os import path, listdir, remove


class Camera:
    def __init__(self, id=0, camera=None):
        self.camera = camera
        cur_dir = path.dirname(__file__)
        self.folder = path.abspath(path.join(cur_dir, '../resources/images'))
        self.id = id

    def capture(self):
        if self.camera is not None:
            filename = str(self.id) + '.jpg'
            self.camera.capture(self.folder + '/' + filename)
            self.id += 1
            return self.id - 1

    def clear(self, memory=20, interval=10):
        # All files in self.folder
        files = listdir(self.folder)
        files = sorted(files, key=lambda e: int(e.split('.')[0]))
        if memory < 0:
            to_delete = []
        else:
            to_delete = files[memory*interval:]
        if self.id % interval != 0:
            # We don't save all the photos...
            to_delete.append(files[0])
        for file in to_delete:
            remove(path.join(self.folder, file))
        return True

    def set_camera(self, c):
        self.camera = c


class PiCamera:
    """
    Shell class for tests
    """
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

    def capture(self, folder):
        with open(folder, 'w') as f:
            f.write('')
