import requests
from requests import sessions
import json
import os
from twilio.rest import Client
import datetime
import winsound
import time


curr_time = datetime.datetime.now()
curr_date = curr_time.strftime("%d-%m-%Y")

url = "http://cowin.gov.in/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date="+curr_date+"?"
#print(url)
payload={}
headers = {
  'Accept-Language': 'hi_IN'
}
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

while(True):
    time.sleep(30)
    response = requests.request("GET", url, headers=headers, data=payload)

    response_text = response.text
    session_dict = json.loads(response_text)

    for session in session_dict:
        for center in session_dict[session]:
            print(f'Checking {center["name"]}')
            if (center['available_capacity_dose1'] > 0 and center['vaccine'] == 'COVISHIELD'):
                print("found vaccine")
                message = client.messages.create(
                        body="Vaccine available at "+ center['name'] +", Pincode: "+ str(center['pincode']),
                        from_='+1xxxxxxxxxx',
                        to='+91xxxxxxxxxx'
                    )
                for i in range (5):
                    duration = 1000  # milliseconds
                    freq = 440  # Hz
                    winsound.Beep(freq, duration)
