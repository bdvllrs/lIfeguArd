from time import sleep
from Camera import Camera
import requests

api_url = "http://192.168.0.31:8080/api"
settings = requests.get(api_url + '/settings').json()
pictures_memory = int(settings['memory'])
photo_interval = int(settings['photo_interval'])
camera = Camera(id)

while True:
    recording = int(requests.get(api_url + '/setting/recording').json()['content'])
    if recording:
        id = int(requests.get(api_url + '/pictures?last=1').json()['id']) + 1
        with Camera(id) as camera:
            sleep(2)
            while recording:
                filename = camera.capture()
                # We add the file to the API
                requests.post(api_url + '/picture', {"path": filename})
                # We clear the folder
                camera.clear(pictures_memory)
                recording = int(requests.get(api_url + '/setting/recording').json()['content'])
                sleep(photo_interval)





