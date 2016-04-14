from locust import HttpLocust, TaskSet, task
import random

# Disable insecurity warning
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

class UserBehavior(TaskSet):
    reqs = []
    def on_start(self):
        """ load request database """
        self.loadDb()

    def loadDb(self):
        if len(self.reqs) != 0:
            return
        with open("requests.txt") as f:
            self.reqs = [x.strip() for x in f.readlines()]
        pass

    @task(1)
    def index(self):
        # SSL certificate verification is disabled, it is slow, does not matter here. Not testing verification speed...
        self.client.get(random.choice(self.reqs), verify=False)

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=0
    max_wait=0

