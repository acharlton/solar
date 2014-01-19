rpi_9000_web
===========
On a raspberry with Apache, designed to be run from /var/www/

A Raspberry PI build designed to run off DC only. Initially it will be equipped with various sensors to monitor statistics and durability. For starters it will have an external DC battery monitor cctry using MCP3008, Ambient Temp, internal stats, CPU, disk stats etc It will have some basic imaging scripts to test motion detect, timelapse, webcam, IR video and still imaging using RPI camera module. The solar system is a 5W 5.5V DC. Im trying various Li-Ion batteries 20000mAh and 9000mAh and Model A using 5V. Once this been optimized I'll convert to 3.3V if possible.

The idea is not have to rely on mains electricity. This is to make it portable and not reliant on conventional connectivity. This particular build should provide some camera tools depending on the need either still, video, security webcam or motion detect. The unit will have a gps, UHF radio and a wifi or gsm network connection. For this I need to have decent monitoring of battery and environment status. I aim to use the machine fully enclosed in a transparent box for visibiity and weather proofing so temperature will be a challenge.

The stats use RRDtool database files for lengthy local offline storage, data will be graphable via a web server and an export to Xively will allow external visibilty. Web pages are in Jquery and Highcharts allowing simple customizable web pages and scripts.


NOTE: These scripts will be hacked to pieces daily until a useful configuration is found, then I will remove the warnings.
