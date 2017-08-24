from time import sleep
from Camera import Camera
import requests

api_url = "http://192.168.0.31:8080/api"
pictures_memory = 10
id = int(requests.get(api_url + '/pictures?last=1').json()['id'])
camera = Camera(id)

while True:
    if int(requests.get(api_url + '/setting/recording').json()['content']):
        filename = camera.capture()
        # We add the file to the API
        requests.post(api_url + '/picture', {"path": filename})
        # We clear the folder
        camera.clear(pictures_memory)
    sleep(5)
