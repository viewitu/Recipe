Since the update of MongoDB to 3.6 there have been a few changes to the installation process.

Now, in order to get it working you'll need to run the following commands:

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update
sudo apt-get install -y mongodb-org
You should now have mongo 3.6.2 or newer, you can double check with mongo --version 

Now type cd in the terminal and hit enter to go into the root directory ~

Enter the following:

mkdir data
echo "mongod --dbpath=data --nojournal" > mongod
chmod a+x mongod
Now, in order to run mongod you'll first need to cd into root ~ then run ./mongod 

Note: You no longer need to follow/enter the commands in the next video, as the ones you just entered from above will have replaced them

----------------------

Additionally, after you're up and running with mongo, be sure to shut down your ./mongod server each time you're done working. You can do this with ctrl + c 

If you leave it running then Cloud 9 could timeout and cause mongo to crash. If this happens, try the following steps to repair it. 

From the command line, run:

cd ~
./mongod --repair
If you're still having trouble getting it to run then find the /data directory (it should be inside of ~) and cd into it. Once inside, run rm mongod.lock then cd back into ~ and run ./mongod again (see below).

cd ~/data
rm mongod.lock
cd
./mongod
If you continue to have difficulties with this then please open up a new discussion so we can assist you.

As a side note: In the Mongo Shell Basics video you'll see Colt use the show collections command which will show something called system.indexes . This will no longer show up in the latest versions of MongoDB. You can read more about this here.

