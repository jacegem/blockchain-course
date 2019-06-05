Widows XP : Administrator / 0ssok



계층                                           주요정보      데이터 전송 단위          주요 프로토콜

======================= =========  ================= ===========

응용 = 프로세스		: 메시지                                               약 65000개

전송				+ 포트번호     데이터그램/세그먼트    UDP, TCP

네트워크 = 인터넷		+ IP주소         패킷                               IP, ICMP, ...

데이터링크 --+			+ MAC주소    프레임                            Ethernet, PPP, … 

물리 -----------+ = 네트워크 인터페이스/접근

![img](https://lh5.googleusercontent.com/OZ0l5uO2kEO24Ln5xT6mY0HUuLHvcTcGUi1GGQvosLDax7d0M-2iSoSLXVpK3awxPf1rWXvP2y2H2oLsYfFwlX7TkR3ffUHGHvZ40ueD6lxB0PFg31sSFCfTd_erSk3pvEETB42O)



TCP 헤더

![img](https://lh6.googleusercontent.com/5wCm2nA1ktxHoNhxf7i4aCevqszfdFsLJuDguc-gucb1Z-J67Xl8NriZaAB4hYcLr6ew0YLlK8RhpFwmxWSPhYjHZlJrPSXDEod4uXZji38vLiwWpIZIF51yZPlVZSi_qA-VnMsG)

IP 헤더

![img](https://lh5.googleusercontent.com/cfUeGPkz3UDRXU8Q7e0PU9ZVz3Xc51kOFVavzjcsyYNx-AcNAUTcavwvizuKQvKzPuXQiOvP2lkUM3HplHY9f5oI_zubpcFtDtpH0T6cy6zIprMME6zSNv_6OBw3L6ivVOWT7xdi)

티얼드롭(tear drop) 공격

IP 헤더의 프래그먼트 오프셋을 조작하여 수신측에서 분할된 패킷을 재조립할 수 없도록 하는 공격 기법

## **참고자료**

<http://www.pyrasis.com/docker.html>

<https://docs.docker.com/engine/reference/commandline/cli/>

<https://www.slideshare.net/pyrasis/docker-fordummies-44424016>

[https://myanjini.tistory.com/category/%EB%8F%84%EC%BB%A4](https://myanjini.tistory.com/category/도커)

**포트 스캐닝**

# **TCP Open Scan**

TCP 연결과정(3-way handshaking)을 통해서 해당 포트의 실행(사용) 여부를 확인

해당 포트가 유효하면 : SYN -> SYN/ACK -> ACK ⇒ 연결(세션)이 수립 -> 접속(연결) 로그가 남음

해당 포트가 무효하면 : SYN -> RST/ACK 



![img](https://lh4.googleusercontent.com/aS8Ot0_0iSSu4w_Pzn6DORHs15KYGgSlSe2NGEOmfACtuPwp-rod7pAYqtyKgN7B5R39p9I94VkjFaI7Od4TYxocSNHNREi9L-x4p0C_DYFZUachH84YmQeuf7z-QsRM_LT7KO55)

# **Stealth Scan**

기록을 남기지 않는 포트 스캔 방법

# **TCP half open scan = TCP SYN open scan**

해당 포트가 유효하면 : SYN -> SYNC/ACK -> (RST) ⇒ 연결이 수립되지 않음 -> 로그가 남지 않음 

해당 포트가 무효하면 : SYN -> RST/ACK



![img](https://lh6.googleusercontent.com/uLRsNCed6S5nVuuOebqI5BPu4kKQlSl0EJfu6L6Uz8i6DyVerKKRswNkpbWpwHOEo-N2b-qObJv60RwjMMmehNGYIpVaAoS1p5AcMUMLlMD1Ee3XV41hAYJ2ZjRtE56CXZoVRyTO)

# **FIN scan** 

해당 포트가 유효하면 : FIN -> ??? (무응답)

해당 포트가 무효하면 : FIN -> RST/ACK



![img](https://lh5.googleusercontent.com/fufc71vnOnlYLzXuHOH1vZysw9knsQNe_-CSmv8fjorOrq0VHVxMtk6VXisUNeujAHP3u8fIY8yPvxnP-HbqbSQyNYLzqJxC60xjoy_8a4AM-v8N2GhOP9HygJfG_n-zgxlQROk6)

# **XMAS scan** 

해당 포트가 유효하면 : FIN+PSH+URG -> ??? (무응답)

해당 포트가 무효하면 : FIN+PSH+URG -> RST/ACK



![img](https://lh5.googleusercontent.com/Z6l8A2k2889D5OHGU0m9j63GMBbzW7pbtO0N9VTpIfOydyjB0y3XLrmRSSg0VBlQYac8C6fE-KtCt5QbrngeCnhOV8JjDYU_ArChGFGyAb-ACRkvP4QCBRoZx1zQqwY9eNq3CSpp)

# **NULL scan** 

해당 포트가 유효하면 : NULL -> ??? (무응답)

해당 포트가 무효하면 : NULL -> RST/ACK



![img](https://lh5.googleusercontent.com/oEUJC-h570N-ebM_ilCr1NKQHg0G6UqxM94uC7b9AcRiW5vtDmM3U7Fda8DWI5PgBjplH7LrrxOmKCsH5PwvuAcweu1qmJyLjpnOPRztHum0HIAA2lrEhEzGl2BNUU-msq6uRzLZ)

# **nmap (network map)**

- 네트워크에 연결되어 있는 호스트의 정보를 파악하는 도구
- nmap을 이용해서 네트워크에 연결되어 있는 호스트의 IP, OS, Service Port, SW 등을 확인할 수 있음



@Kali#1에 apache2, vsftp 서비스를 실행

\# service apache2 start

\# service vsftpd start

@Kali#2에서 Kali#1으로 웹 서비스 요청과 FTP 서비스 요청을 할 수 있음

# **ARP(Address Resolution Protocol)**

![img](https://lh4.googleusercontent.com/x2eLOikFTdAlkUVgu5ELFm7TyXrFJ21GNodVSMq2_euMF0KKGW4OYqehlQy6OHguVfD4IQIS57xXowct2YcZB9OuoSCZM5vF6hiMFN5iRRESWZJ-_nQSFeIJjNBAGfGsyAKqQfpU)

![img](https://lh6.googleusercontent.com/mMEydEFo7Jgiy5rGf6Ustr2wr8VU5xEiBTRcA10nU-QqS2b75ut0HN55GkxOYaqXDdkx-XQj9V301FnYc9LbNOx2KhN3KfKjE0T2f24pF7eR7luqFo_LodTP5LNDMdl050Es0NHQ)

windows xp : administrator / 0sook (숫자0 영문자sook)

​        IP Address. . . . . . . . . . . . : 192.168.111.140

​        Subnet Mask . . . . . . . . . . . : 255.255.255.0

​        Default Gateway . . . . . . . . . : 192.168.111.2

Kali#1 : 192.168.111.130

Kali#2 : 192.168.111.131

\#1 @WinXP에서 네이버 접속을 확인

\#2 @WinXP에서 arp cache table 확인



\#3 @Kali2에서 WinXP에게 Gateway가 자신(Kali2)이라고 속임



\#4 @WinXP에서 arp cache table 확인 ⇒ gateway의 mac 주소가 변경된 것을 확인



\#5 Kali2에서 Kali1으로 arp spoofing, Kali1에서 wireshark를 이용해서 arp 패킷을 확인 ⇒ destination mac이 잘못된 것을 확인

![img](https://lh5.googleusercontent.com/a0Rk7UcLm-RR-qtmgLJpfib-T1a0XHDV_ccbcqmmB0a9uKitQN4oRS3M0boaXhd1qrNibR7d1ZlbOHqHbQqvRVzNtHkwPNjDwIHuwpGFLlmXAjzqNqJTCKr6z5c9k718loBCNMqG)

ARP Spoofing 방어

ARP cache talble에 Gateway MAC 주소를 정적으로 설정

Windows 

\> arp -s GATEWAY_IP GATEWAY_MAC

\> netst interface ip delete neighbors "NETWORK_CARD_NAME" "GATEWAY_IP"

\> netst interface ip add neighbors "NETWORK_CARD_NAME" "GATEWAY_IP" "GATEWAY_MAC"

 

MTM(Man in The Middle) attack

두 호스트 간에 통신을 하고 있을 때, 중간자가 사이에 끼어들어 통신 내용을 도청, 조작하는 공격

DNS Spoofing 

\### etter.dns 파일을 수정

root@kali:~# gedit /etc/ettercap/etter.dns

*.naver.*     A   192.168.111.131  # 공격자의 IP 주소 (kali#2) * 탭 사용 금지

\### ettercap 실행

root@kali:~# ettercap -G

Sniff > Unified sniffing > eth 0 ⇐ 스니핑할 NIC를 지정

Hosts > Scan for hosts ⇐ 해당 LAN에 존재하는 호스트를 검색

Hosts > Hosts list ⇐ 검색 결과를 확인

공격 대상을 지정

target1 => Gateway (192.168.111.2)

target2 => WinXP (192.168.111.140)

Apr spoofing ⇒ 공격자를 공격 대상 사이에 위치 ⇒ WinXP <---> Kali#2 <---> Gateway

Mitm > ARP Spoofing > Sniff remote connections 

DNS Spoofing 공격

Plugins > Manage the plugins > dns_spoof 

WinXP에서 http://www.naver.com으로 접속을 시도 → Kali#2에서 제공하는 웹 페이지가 보이면 공격 성공

scapy

- 파이썬으로 작성된 패킷 조작 도구
- 패킷 디코딩, 전송, 캡처, 수정 등 다양한 기능을 제공
- https://www.itlkorea.kr/data/scapy-pocket-guide0.2.pdf



root@kali:~# scapy
INFO: Can't import python gnuplot wrapper . Won't be able to plot.
WARNING: No route found for IPv6 destination :: (no default route?)
Welcome to Scapy (2.3.2)
> ls()  #지원하는 프로토콜 확인



TCP 헤더 정보를 출력

```shell
>>> ls(TCP)
sport      : ShortEnumField            = (20)
dport      : ShortEnumField            = (80)
seq        : IntField                  = (0)
ack        : IntField                  = (0)
dataofs    : BitField (4 bits)         = (None)
reserved   : BitField (4 bits)         = (0)
flags      : FlagsField (8 bits)       = (2)
window     : ShortField                = (8192)
chksum     : XShortField               = (None)
urgptr     : ShortField                = (0)
options    : TCPOptionsField           = ({})
```

현재 설정되어 있는 TCP 헤더 정보를 출력

```shell
>>> TCP().display()
###[ TCP ]###
  sport= ftp_data
  dport= http
  seq= 0
  ack= 0
  dataofs= None
  reserved= 0
  flags= S
  window= 8192
  chksum= None
  urgptr= 0
  options= {}
```

사용 가능한 기능을 확인

```shell
>>> lsc()
arpcachepoison      : Poison target's cache with (your MAC,victim's IP) couple
arping              : Send ARP who-has requests to determine which hosts are up
bind_layers         : Bind 2 layers on some specific fields' values
bridge_and_sniff    : Forward traffic between two interfaces and sniff packets exchanged
```



## 현재 설정된 IP 헤더 정보를 출력

```shell
>>> IP().display()
###[ IP ]###
  version= 4
  ihl= None
  tos= 0x0
  len= None
  id= 1
  flags= 
  frag= 0
  ttl= 64
  proto= hopopt
  chksum= None
  src= 127.0.0.1
  dst= 127.0.0.1
  \options\
```

```shell
>>> ip = IP()
>>> ip.display()
###[ IP ]###
  version= 4
  ihl= None
  tos= 0x0
  len= None
  id= 1
  flags= 
  frag= 0
  ttl= 64
  proto= hopopt
  chksum= None
  src= 127.0.0.1
  dst= 127.0.0.1
  \options\
```



### 현재 IP 헤더에 목적지 주소를 변경

```shell
>>> ip.dst = "192.168.111.130"
>>> ip.display()
###[ IP ]###
  version= 4
  ihl= None
  tos= 0x0
  len= None
  id= 1
  flags= 
  frag= 0
  ttl= 64
  proto= hopopt
  chksum= None
  src= 192.168.111.131
  dst= 192.168.111.130
  \options\
```



```shell
>>> ip = IP(dst="192.168.111.140")
>>> ip.display()
###[ IP ]###
  version= 4
  ihl= None
  tos= 0x0
  len= None
  id= 1
  flags= 
  frag= 0
  ttl= 64
  proto= hopopt
  chksum= None
  src= 192.168.111.131
  dst= 192.168.111.140
  \options\
```

### 레이어를 쌓는 방법

```shell
>>> ip = IP()
>>> tcp = TCP()
>>> packet = ip/tcp
>>> packet.display()
###[ IP ]###
  version= 4
  ihl= None
  tos= 0x0
  len= None
  id= 1
  flags= 
  frag= 0
  ttl= 64
  proto= tcp
  chksum= None
  src= 127.0.0.1
  dst= 127.0.0.1
  \options\
###[ TCP ]###
     sport= ftp_data
     dport= http
     seq= 0
     ack= 0
     dataofs= None
     reserved= 0
     flags= S
     window= 8192
     chksum= None
     urgptr= 0
     options= {}
```



```shell
>>> sf = sniff()
^C>>> sf.display()
0000 Ether / IP / TCP 192.168.111.131:57046 > 104.74.158.194:https A
0001 Ether / IP / TCP 192.168.111.131:57042 > 104.74.158.194:https A
0002 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57046 A / Padding
0003 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57042 A / Padding
0004 Ether / IP / TCP 192.168.111.131:54172 > 117.18.237.29:http A
0005 Ether / IP / TCP 117.18.237.29:http > 192.168.111.131:54172 A / Padding
0006 Ether / IP / TCP 192.168.111.131:58380 > 183.110.194.95:https PA / Raw
```



### help

```shell
>>> help()

Welcome to Python 2.7!  This is the online help utility.

If this is your first time using Python, you should definitely check out
the tutorial on the Internet at http://docs.python.org/2.7/tutorial/.

Enter the name of any module, keyword, or topic to get help on writing
Python programs and using Python modules.  To quit this help utility and
return to the interpreter, just type "quit".

To get a list of available modules, keywords, or topics, type "modules",
"keywords", or "topics".  Each module also comes with a one-line summary
of what it does; to list the modules whose summaries contain a given word
such as "spam", type "modules spam".

help> 
```



```shell
>>> sf = sniff(count=10)
>>> sf.display()
0000 Ether / IP / TCP 192.168.111.131:57150 > 104.74.158.194:https PA / Raw
0001 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57150 A / Padding
0002 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57150 PA / Raw
0003 Ether / IP / TCP 192.168.111.131:57150 > 104.74.158.194:https A
0004 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57150 A / Raw
0005 Ether / IP / TCP 192.168.111.131:57150 > 104.74.158.194:https A
0006 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57150 A / Raw
0007 Ether / IP / TCP 192.168.111.131:57150 > 104.74.158.194:https A
0008 Ether / IP / TCP 104.74.158.194:https > 192.168.111.131:57150 A / Raw
0009 Ether / IP / TCP 192.168.111.131:57150 > 104.74.158.194:https A
```



```shell
>>> sf[0].show()
###[ Ethernet ]###
  dst= 00:50:56:e6:c9:9c
  src= 00:50:56:24:73:f1
  type= 0x800
###[ IP ]###
     version= 4L
     ihl= 5L
     tos= 0x0
     len= 483
     id= 14447
     flags= DF
     frag= 0L
     ttl= 64
     proto= tcp
     chksum= 0xc96d
     src= 192.168.111.131
     dst= 104.74.158.194
     \options\
###[ TCP ]###
        sport= 57150
        dport= https
        seq= 478566839
        ack= 1803907364
        dataofs= 5L
        reserved= 0L
        flags= PA
        window= 64240
        chksum= 0x6e77
        urgptr= 0
        options= []
###[ Raw ]###
           load= '\x17\x03\x03\x01\xb6\x00\x00\x00\x00\x00\x00\x00\x05\xafY\xe2C\xb1\xd1\xc536\x90\xcf\x93C\xcb9Qa\xb6\xb2\x1d\xbf"\xa3\x91\xb0\xa0<\x8f\xf0\xf8\xd4XTN\xed\xc4\x9c\xc9\xab\x9c\x124\x1d\xd9M\xc6|\xb7\xd2n\x91\xb3\x84E\xbc%\x89\xe6\xce#v\xa5\x83S\xf0\xd3\x14\xa8\x16\x11k\xb5\xed\x80@p\x8b\x16|\xfa\xf0\xb7\xa1\xd7\x10\xdc\x9e~^\xe2O[#\xf9\xc5\xfd#p\xd32\x93\xd0\xcf\x95_\x9b\x99\\\xea\x8eH;\xbd\x0bu\xcb\x7f&\x9e,5\x91o\xfe\xa0\xd8sX \x82\xfdw>\xe3\xf4\xdc\xd0MJ\x14n\x87\x1eJz\x93\xf3\xa5\xaa\xcb\x18z\xee\x7fs\x88\x82,\x16&^\x86~\xcf\xed\x1f\x00\xa7\xbb\xc47\xea\x80\x9fY\xe5\xa99\x1f\x9du.\xa3\xc4L\x07\t\xfbj\x15i\xedk;\xd3\x0b\xdd\x9b\x171B\xa7\xeb$\x05\x89\xa7p\xfdm\x04R\xa7\x12`\xa3\x88\xe7z\xbc\x9fpf\xb5\x05\x06\xcc&\xa6A\x9cd)\xf8\x0e\xad\xbb\xef\x80A\xe8\xea\xfc\x940Y\xa8\xba#\xcb\xe9v\xc3x\xcc\xb2B\xa9\x99W\xab# m\xc4PI\xa2\x14\xd8o\xc4%,}\xbdH\xc2;\xa4\x1d\xa3\x82\xca\x82\x1c\x16\xb6Z\xd8\x05\xe5\x07\x85\nv3X59\x01\xcb\x85\xc7~\xb5M\x98\xd7\x06W\x07f\xe3\'\xef\x9a\xe6\x85\xf36\xb6Q\x10\xf1\x18\xf7\x92\xde\t?\x10\x7f2\xe6m\xc2\xc8Rw~\x1dFX\x0b\xf5\xdf\x05\xb4.m\xeac\x84\xc1\xd7\xa8\xf7y\xe7\xa1\xc3\t\x10\x8b\x9c\r\xfey\x96\x17\x8b`\'\xa8#}\x15_\x7f`m\x10\xe4\xbb8\t\xff\xac\xe5\xa3E\xbd\x15\x1aP\x90\x8e7\x17Q\x08\xc3u\x1c\x83\x85\xdfl\x8b\xdfk\t~\x9eG^?\xdb\x1fu= \xb74A\xe4\xda&\xb4'
```



```shell
>>> tcp.sport = RandNum(1024, 65535)
>>> tcp.display()
###[ TCP ]###
  sport= <RandNum>
  dport= http
  seq= 0
  ack= 0
  dataofs= None
  reserved= 0
  flags= S
  window= 8192
  chksum= None
  urgptr= 0
  options= {}
```





```shell
>>> syn = ip/tcp
>>> syn_ack = sr1(syn)
Begin emission:
Finished to send 1 packets.

>>> ack = ip/TCP(sport=syn_ack[TCP].dport, dport=80, flags="A", seq=syn_ack[TCP].ack, ack=syn_ack[TCP].seq+1)

>>> send(ack)




```























































