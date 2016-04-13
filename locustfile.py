from locust import HttpLocust, TaskSet, task
import random

class UserBehavior(TaskSet):
    reqs = []

    def on_start(self):
        """ load request database """
        self.loadDb()

    def loadDb(self):
        with open("requests.txt") as f:
            self.reqs = [x.strip() for x in f.readlines()]
        pass

    @task(1)
    def index(self):
        self.client.get(random.choice(self.reqs))

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000

