import paho.mqtt.client as mqtt
import time
import random


def on_message(client, userdata, message):
    str_message = str(message.payload.decode("utf-8"))
    print(str_message)
    try:
        chambre, couloir, radiateur, salon, exterieur, h_chambre, h_couloir, h_radiateur, h_salon, h_exterieur, _ = str_message.split(" ")
        
        current_time = int(time.time())
        
        with open("chambre.txt", "a") as f:
            f.write(f"{current_time},{chambre},{h_chambre}\n")
            
        with open("couloir.txt", "a") as f:
            f.write(f"{current_time},{couloir},{h_couloir}\n")
            
        with open("radiateur.txt", "a") as f:
            f.write(f"{current_time},{radiateur},{h_radiateur}\n")
            
        with open("salon.txt", "a") as f:
            f.write(f"{current_time},{salon},{h_salon}\n")
            
        with open("exterieur.txt", "a") as f:
            f.write(f"{current_time},{exterieur},{h_exterieur}\n")
        
    except ValueError:
        print("value error")
        pass
    


addr = "broker.hivemq.com"

client = mqtt.Client(f"cliMulti{random.random()*10000:.0f}")

client.on_message=on_message
client.connect(addr)
client.loop_start()

client.subscribe("multi/temp/TC")


while 1:
    time.sleep(1)

client.loop_stop()

