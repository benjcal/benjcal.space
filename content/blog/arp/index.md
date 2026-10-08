+++
title = "[DRAFT] ARP!"
description = "Learning why network switches are so cool!"
date = "2026-10-04"
draft = true
+++

Recently I’ve been studying for my CCNA, which apart from being interesting professionally, is also excellent fuel for my home lab addiction 😅.

At any rate, a super cool tech that I’ve been learning about is ARP (or [Address Resolution Protocol](https://en.wikipedia.org/wiki/Address_Resolution_Protocol)), which is indispensable for communication between devices in a LAN (Local Area Network).

##### The briefest network packet explanation. 

To send a a message over the network you need, first, something to say (duh!) but also you need to know to who you want to say it! Think of it like an envelope with a letter inside and an address in the envelope. But in networking we use two addresses instead of one. It might seem redundant or extra but it is not. I'm sure you are familiar with IP addresses. IP address is also called the logical address and it is used in router to, erm, route network packets. But when we are talking about a LAN (local area network) an router is not necessarily involved. Instead a network switch suffices to make a LAN, no router necessary. But the switch has a problem, it just received a message from your machine in port 1, and it has another 23 ethernet cables connected and it needs to decide to which port to forward that message to, and switches, in general do not know anything about IP address (this has to do with OSI model and Layer 2 and 3... not out concern today).

So, how does the switch know to which port to forward the message you just sent? Well, that's where the second address comes into play! The envelope has an address for the switch to use! that is the MAC address! The switch has the job of learning the MAC address of the devices connected to each port

The problem is this... When you send data over the network, that network packet has two addresses, it has the IP address of the host AND the MAC address of it too... so when it sees the MAC address 11.22.33.44.55.66 it know that that device is connected to port "Ethernet 17" and it take the message it received on port 1 and put it on port 17. That's the switch switching for you!


You can think of the IP address as a logical address: it says where the packet is ultimately going. If I send a DNS request to 1.1.1.1, that is the IP the packet carries from start to finish, no matter how many routers it crosses. But my network card has no idea how to reach 1.1.1.1 directly, it can only talk to the device that is physically next to it. So the MAC address on the packet (technically frame) is the one of my router (the default gateway), and the router takes it from there. But when the device is in my LAN, there is no middleman, so the MAC address I need is the one of the device itself.

For the IP address we can just assume that it is a given, my Proxmox server is at 192.168.88.20, but I never had to type the MAC address to ssh into that server... So, how does my machine know so it can write the complete frame to send data to that server?

Well, it’s rather simple but at the same time ingenious. It just asks everybody on the network who has the IP address of, in this case, 192.168.88.20!

So before the packet is sent, a broadcast message, that is, a message that goes to every network device (it’s sent to the special MAC `ff:ff:ff:ff:ff:ff`), is sent, but only the device that has that IP address replies with its MAC address, straight back to whoever asked! The network switch is what makes this work: it floods the broadcast out of all its ports so every device on the LAN hears the question.

Let’s actually see this thing working in Linux and Wireshark!

In Linux the ARP table is managed using `ip neighbor` so let’s start by taking a look at what neighbors’ MAC addresses my machine knows

...

Now, in order to actually sniff the network traffic of my machine sending the ARP request let’s forget all our neighbors with `sudo ip neighbor flush all` and make a ping afresh.

...

I’m a fan of how Wireshark renders these messages because that is literally what the machine is asking... “Who has 192...?” And then the reply comes: “192... is at (MAC address)”

A question that comes about then is... What if a different host replies “I am xyz”... even if they are not xyz? Well, that is called an ARP poisoning attack and you can do your own research on that... But it is one of the reasons why segmenting a network into VLANs is a good idea for network security. A VLAN limits how far a broadcast packet goes...

A very nice property of ARP tho is being able to question the whole network, roll calling if you will! I can use a tool like `arp-scan` and scan my whole network asking everyone in an IP range who they are!

And since I have such a poor memory of what IP address I assigned to what, that command has become a very useful tool for me! It even prints the vendor next to each MAC, which helps a ton.

`sudo arp-scan 192.168.88.0/24`

...

Anyways, that is ARP in a nutshell!
