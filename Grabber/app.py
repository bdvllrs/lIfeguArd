from picamera import PiCamera
from time import sleep
from Camera import Camera
import requests

api_url = "http://192.168.0.31:8080/api"
settings = requests.get(api_url + '/settings').json()
photo_id = int(requests.get(api_url + '/pictures?last=1').json()['id']) + 1
camera = Camera(photo_id)

while True:
    recording = int(settings['recording'])
    if recording:
        with PiCamera() as c:
            camera.set_camera(c)
            sleep(2)
            while recording:
                settings = requests.get(api_url + '/settings').json()
                filename = camera.capture()
                # We add the file to the API
                requests.post(api_url + '/picture', {"path": filename})
                # We clear the folder
                camera.clear(int(settings['memory']))
                recording = int(settings['recording'])
                sleep(int(settings['photo_interval']))
    sleep(5)





