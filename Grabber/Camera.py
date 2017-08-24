from picamera import PiCamera
from time import sleep
from os import path, listdir, remove


class Camera:
    def __init__(self, id=0):
        self.camera = PiCamera()
        cur_dir = path.dirname(__file__)
        self.folder = path.abspath(path.join(cur_dir, '../API/public/images/pool'))
        self.id = id

    def capture(self):
        filename = str(self.id) + '.jpg'
        self.camera.capture(self.folder + '/' + filename)
        self.id += 1
        return filename

    def clear(self, memory=20):
        # All files in self.folder
        files = listdir(self.folder)
        files = sorted(files, key=lambda e: e.split('.')[0], reverse=True)
        if memory < 0:
            to_delete = []
        else:
            to_delete = files[memory:]
        for file in to_delete:
            remove(path.join(self.folder, file))
