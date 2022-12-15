import paho.mqtt.client as mqtt
import time
import json
import datetime
import matplotlib.pyplot as plt
import numpy as np
import random

known_tags = [
    "7C:D9:F4:14:1B:B1",
    "7C:D9:F4:13:73:61",
    "7C:D9:F4:1E:3C:54",
    "7C:D9:F4:1C:CF:39",
    "7C:D9:F4:19:20:8D",
    "7C:D9:F4:10:5E:8C",
    "7C:D9:F4:18:8A:99"
]


def on_message(client, userdata, message):
    str_message = str(message.payload.decode("utf-8"))
#    print(str_message)
    js = json.loads(str_message)
    mac = js[0]["sensorIdentifier"]["value"]
    temp = js[0]["events"][0]["data"][0]["value"]
    location = js[0]["events"][0]["data"][1]["value"]

    mac_index = -1
    if mac in known_tags:
        mac_index = known_tags.index(mac)
        print(f"{int(time.time())},{temp},{location}\n")
        with open(f"base{mac_index+1}.txt", "a") as f:
            f.write(f"{int(time.time())},{temp},{location}\n")


addr = "broker.hivemq.com"

client = mqtt.Client(f"cliMulti{random.random()*10000:.0f}")

client.on_message=on_message
client.connect(addr)
client.loop_start()

client.subscribe("multimulti/city")


while 1:
    time.sleep(1)

client.loop_stop()

