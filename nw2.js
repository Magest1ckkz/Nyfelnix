const io = require("socket.io-client");
const he = require("he")
const readline = require("readline")
const socket = io("https://www.windows93.net:8086", {
	forceNew: true,
	transportOptions: {
		polling: {
			extraHeaders: {
				"Accept": "*/*",
				"Accept-Encoding": "identity",
				"Accept-Language": "*",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive",
				"Cookie": "",
				"Host": "www.windows93.net",
				"Origin": "http://www.windows93.net",
				"Pragma": "no-cache",
				"Referer": 'http://www.windows93.net/trollbox/index.php',
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36"
			}
		}
	}
});
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

const devs = require("./devs.json")
const banlist = require("./banlist.json")

rl.on('line', (content) => {
socket.send(content);
});
var sec = 0
setInterval(function(){
    sec++
},1000)

const swap_keys_and_values = (object) => Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]))
const strmap = (the_map, string) => string.split("").map(c => the_map[c]).join("")
let braille_alphabet = Array.from({ length: 0x283f - 0x2800 }, (_, i) => String.fromCharCode("\u2800".charCodeAt(0) + i))
const braille_map = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=".split("").reduce((o, n, i) => {
	return o[n] = braille_alphabet[i],
	       o[n.toLowerCase()] = o[n], o
}, {})
braille_alphabet = null
const inverse_braille_map = swap_keys_and_values(braille_map)
const to_braille = (string) => strmap(braille_map, string)
const from_braille = (string) => strmap(inverse_braille_map, string)

const shuffle = str => [...str].sort(()=>Math.random()-.5).join('')

var freeze = 0
var freezez = 0

const help = "=== Nyfelnix v0.1.5 b50 ===\n\nCategories\n+text (+help text) - User input commands\n\n+help (+cmds) - Shows this message\n+gayrate <text> (+gaycheck <text>) - How gay are you or anything else\n+fish - Just a random fishing simulator /jk\n+runtime (+uptime) - Bot uptime how long has it runned since the start\n+changelog (+updates) - News of bot updates\n\n== © 2021-2024 Magestick =="

socket.emit("user joined", "Nyfelnix [+]", "teal", "", "");
// socket.send("/r testing")

socket.on("message", function(a) {
	
	if(banlist.banned.includes("a.home")) {return}

	if (a.msg == "+test") {
		socket.send("This is a test command. Its main purpose is for testing certain things. It doesn't appear in the help page.")
}
	
	if (a.msg == "+help" || a.msg == ("+cmds") || a.msg == ("+cmmds") || a.msg == ("+h")) {
		let repeated = false
		socket.send(help)
		repeated = true

		if(repeated = true)
		socket.send(help+"​")
		repeated = false
	}
	
	if (a.msg == "+help text" || a.msg == ("+text")) {
		let repeated = false
		socket.send("Category: Text commands\nAll commands in this category require the user input.\n\n+say - Something to say\n+t2b - Convert text to braille\n+shuffle - Randomly jumble characters")
		repeated = true

		if(repeated = true)
		socket.send("Category: Text commands\nAll commands in this category require the user input.\n\n+say - Something to say\n+t2b - Convert text to braille\n+shuffle - Randomly jumble characters"+"​")
		repeated = false
	}
	
	if (a.msg == "+changelog" || a.msg == ("+updates")) {
		socket.send("=== Nyfelnix v0.1.5 Build 50 ===\n\n• Text category added\n• All user input commands are moved to the text category\n• +gayrate now supports user input\n• Missing argument warning restructuring\n• Developer commands are now hidden\n\nLast changes were made in Mar 14, 2023 [GMT+3]")
	}
	
//	if (a.msg == "+gayrate" || a.msg == ("+gaycheck")) {
//		if (freeze == 1) {return}
//		socket.send(a.nick + " is " + Math.floor(Math.random() * 101) + "% gay")
//		freeze = 1;
//		
//		setTimeout(() => {
//		freeze = 0;
//		}, 8000); // 8000ms = 8s
//	}

if (a.msg.startsWith("+say") || a.msg == "+say"){
var arg = a.msg.replace("+say ","");
if (arg == "+say" || arg == ""){
socket.send("⚠️ [text] is a required argument, which is missing.");
return;
}
if (arg.startsWith("#") || arg.startsWith("!") || arg.startsWith("m!")){
socket.send("❌ 403 Forbidden - This request you have sent is blocked.");
return
}
if (arg == "d"){
return
}
if (arg == "t"){
return
}
if (arg.startsWith("*hugs")){
socket.send("cqf failed: Attempted to shut down the bot!");
return
}
if (arg.startsWith("+")){
socket.send("cqf failed: Attempted to self-execute the command!");
return
}
if (arg.startsWith("q")){
socket.send(he.decode("​"+arg));
return
}
if (arg.startsWith("/")){
socket.send("The \"/\" commands not work.");
return
}
socket.send(he.decode(arg));
}

if (a.msg.startsWith("+gayrate") || a.msg == "+gayrate"){
	if (freeze == 1) {return}
var arg = a.msg.replace("+gayrate ","");
if (arg == "+gayrate" || arg == ""){
socket.send(a.nick + " is " + Math.floor(Math.random() * 101) + "% gay");
return;
}
socket.send(he.decode(arg + " is " + Math.floor(Math.random() * 101) + "% gay"));
freeze = 1;

		setTimeout(() => {
		freeze = 0;
		}, 8000); // 8000ms = 8s
	}
	
if (a.msg.startsWith("+gaycheck") || a.msg == "+gaycheck"){
	if (freeze == 1) {return}
var arg = a.msg.replace("+gaycheck ","");
if (arg == "+gaycheck" || arg == ""){
socket.send(a.nick + " is " + Math.floor(Math.random() * 101) + "% gay");
return;
}
socket.send(he.decode(arg + " is " + Math.floor(Math.random() * 101) + "% gay"));
freeze = 1;

		setTimeout(() => {
		freeze = 0;
		}, 8000); // 8000ms = 8s
	}

if (a.msg.startsWith("+t2b") || a.msg == "+t2b"){
var arg = a.msg.replace("+t2b ","");
if (arg == "+t2b" || arg == ""){
socket.send("⚠️ [text] is a required argument, which is missing.");
return;
}
socket.send(to_braille(arg));
}


if (a.msg.startsWith("+shuffle") || a.msg == "+shuffle"){
var arg = a.msg.replace("+shuffle ","");
if (arg == "+shuffle" || arg == ""){
socket.send("⚠️ [text] is a required argument, which is missing.");
return;
}
socket.send(he.decode(shuffle("​"+arg)));
}

if (a.msg.startsWith("+/room") || a.msg == "+/room"){
var arg = a.msg.replace("+/room ","");
if (devs.devs.includes(a.home)){
if (arg == "+/room" || arg == ""){
socket.send("⚠️ [room] is a required argument, which is missing.");
return;
}
socket.send(he.decode("/r "+arg));
} else {
	socket.send("❌ 401 Unauthorized: Access denied.")
}
}

if (a.msg.startsWith("+/evaljs") || a.msg == "+/evaljs") {
	var duck = a.msg.replace("+/evaljs ","") //grab args
	if (devs.devs.includes(a.home)){
	if (duck == "+/evaljs" || duck == ""){
	socket.send("⚠️ [code] is a required argument, which is missing.")
	return
	}
	if (duck=="+/evaljs "){
	socket.send("⚠️ [code] is a required argument, which is missing.");
	return "missing arg";
	}
	try{
	if (duck.toLowerCase().includes('child_process')){
	socket.send("ERROR: Illegal access to computer detected!")
	return "illegal";
	}
	socket.send("Returned: " + eval(he.decode(duck)))
	}catch (err){
		socket.send(err.toString())
		}
	} else {
	socket.send("❌ 401 Unauthorized: Access denied.")
	}
	}
	
	if (a.msg == ("+runtime") || a.msg == ("+uptime")) {
    var min = Math.floor(sec/60)%60
    var secs = sec%60
    var hour = Math.floor(sec/3600)%24
    var day = Math.floor(sec/86400)
    socket.send(`Runtime: ${day}d, ${hour}hr, ${min}min, ${secs}sec.`)
}

if (a.msg == "+fish"){
if (freezez == 1) {return}

var fish = require('./fish.json')
function randomInteger(min, max) {
let rand = min - 0.5 + Math.random() * (max - min + 1);
return Math.round(rand);
}
socket.send("You found and caught a " + fish.fish[randomInteger(0, fish.fish.length - 1)] + " and you sold it for " + Math.floor(Math.random() * 2000) + " RUB!")

		freezez = 1;
		
		setTimeout(() => {
		freezez = 0;
		}, 8000); // 8000ms = 8s
}

});
