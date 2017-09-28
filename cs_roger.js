(function() {
    'use strict';
	chrome.storage.local.get("rogerBoxSwitch", function (result) {
		if(result.rogerBoxSwitch == true) run();
	});
	
	function run(){
		// ---------- DOM ------------
		var textNodes = document.getElementsByClassName("quantumWizTextinputPaperinputInput");
		var toggleNodes = document.getElementsByClassName("quantumWizTogglePaperradioEl");		
		var buttonNodes = document.getElementsByClassName("quantumWizButtonPaperbuttonEl");
		if(buttonNodes.length !== 0){
			buttonNodes[0].addEventListener('click', saveOnSubmit);
		}else{
			alert("Error: Extension history will not be saved.");
		}
		
		var oneClick = false;
		function saveOnSubmit(){
			if(!oneClick){
				checkForNameChange();
				saveCount();
				saveToHistory();
				oneClick = true;
			}
		}
		
		function checkForNameChange(){
			chrome.storage.local.get('rogerUsername', function (result) {
				if(result.rogerUsername !== textNodes[0].value){
					if (confirm('Username has changed. Saving new username.')) {
						chrome.storage.local.set({'rogerUsername': textNodes[0].value});
					} else {
						//alert("not saved!");
					}
				}
			});
		}
		
		function saveCount(){
			chrome.storage.local.get('rogerCounter', function (result) {
				if(result.rogerCounter == undefined){
					chrome.storage.local.set({'rogerCounter' : 1});
				}else{
					chrome.storage.local.set({'rogerCounter' : result.rogerCounter + 1});
				}
			});
		}
		
		function saveToHistory(){
			chrome.storage.local.get('rogerHistory', function (result){				
				/* Warning
					if manually changed this history will be wrong..
					fix.. get from form and change address to advertiser name or save url instead of partner name...
				*/
				
			if(result.rogerHistory === undefined || result.rogerHistory === null){
					if(myChoice == undefined){
						chrome.storage.local.set({'rogerHistory': "Submission information not saved."});
						return;
					}											
					chrome.storage.local.set({'rogerHistory': myChoice + " " + random_env});
				}else{
					if(myChoice == undefined){
						chrome.storage.local.set({'rogerHistory': result.rogerHistory + "," + "Submission information not saved."});
						return;
					}	
					chrome.storage.local.set({'rogerHistory': result.rogerHistory + "," + myChoice + " " + random_env});
				}
				
			});
		}
		
		
		// ----------  Survey Data --------------
		var username;
		chrome.storage.local.get('rogerUsername', function (result) {
			if(result.rogerUsername === undefined){
				username = prompt("Please enter your username:");
				if (username === null) return;
			}else{
				username = result.rogerUsername;		
			}		
			textNodes[0].value = username;
			chrome.storage.local.set({'rogerUsername': username});
		});
		
		toggleNodes[6].click(); //g1
		toggleNodes[11].click(); //g2
		toggleNodes[16].click(); //g3
		toggleNodes[21].click(); //g4
		toggleNodes[26].click(); //g5
		toggleNodes[31].click(); //g6
		toggleNodes[36].click(); //g6
		toggleNodes[38].click(); //g8
		toggleNodes[39].click(); //g9
		toggleNodes[41].click(); //g10
		toggleNodes[44].click(); //g11
		toggleNodes[45].click(); //g12
		toggleNodes[47].click(); //g13
		toggleNodes[49].click(); //g14
		toggleNodes[51].click(); //g15
		toggleNodes[53].click(); //g16
		toggleNodes[55].click(); //g17
		toggleNodes[57].click(); //mr1
		toggleNodes[59].click(); //mr2
		toggleNodes[61].click(); //mr3
		toggleNodes[63].click(); //mr4
		toggleNodes[65].click(); //mr5
		toggleNodes[67].click(); //mr6

		// Used arrays and coresponding weights
		var list = ['partnerAPlus', 'partnerA', 'partnerB', 'partnerC'];
		var weight = [0.01, 0.3, 0.3, 0.3];

		var list_env = ['Desktop', 'Mobile'];
		var weight_env = [0.4, 0.6];
					
		// Partner array for select options
		var partnerAPlus = ["Booking.com[626] UK", "Booking.com[626] US", "Booking.com[626] DE", "Booking.com[626] BR", "Booking.com[626] IT", "Booking.com[626] FR", "Booking.com[626] ES", "Booking.com[626] RU" ];
		var partnerA = ["Amoma[830] ES", "Amoma[830] UK", "Amoma[830] DE", "Amoma[830] IT", "Amoma[830] US", "Hotels.com[452] US", "Hotels.com[452] TR", "Hotels.com[452] UK",
						"Hotels.com[452] BR", "Hotels.com[452] DE", "Expedia[406] US", "Expedia[406] UK", "Expedia[406] DE", "Expedia[406] MX", "Expedia[406] JP", "Ebookers[8] DE",
						"Ebookers[8] CH", "Ebookers[8] UK", "Ebookers[8] FI", "Ebookers[8] FR", "Elvoline[1178] US", "Elvoline[1178] DE", "Elvoline[1178] UK", "Elvoline[1178] AU",
						"Elvoline[1178] CA", "Agoda[395] UK", "Agoda[395] JP", "Agoda[395] DE", "Agoda[395] TR", "Agoda[395] AU"];
		var partnerB = ["Travelrepublic[357] UK", "Travelrepublic[357] IE", "Travelrepublic[357] PL", "Melia[440] ES", "Melia[440] UK", "Melia[440] DE",
						"Despegar[588] AR", "Despegar[588] BR", "Despegar[588] MX", "Hotel.de[2230] DE", "Hotel.de[2230] ES", "Hotel.de[2230] IT",
						"tripAdvisor[1696] US", "tripAdvisor[854] US", "tripAdvisor[1696] UK", "tripAdvisor[854] UK", "tripAdvisor[1696] ES", "tripAdvisor[854] ES",
						"Roomdi[2146] ES", "Roomdi[2146] PT", "Roomdi[2146] DE", "HRS[15] DE", "HRS[15] IT", "HRS[15] ES", "Cancelon[1182] IL", "Cancelon[1182] IL",
						"Cancelon[1182] IL", "Sembo[700] UK", "Sembo[700] DK", "Sembo[700] SE", "Priceline[54] US", "Priceline[54] CA", "Priceline[54] US",
						"Ctrip[634] HK", "Ctrip[634] CN", "Ctrip[634] TW", "otel.com[1462] US", "otel.com[1462] UK", "otel.com[1462] DE", "Prestigia[227] UK",
						"Prestigia[227] US", "Prestigia[227] ES", "Orbitz[528] US", "Orbitz[528] US", "Orbitz[528] US", "Orbitz[528] US", "Hotwire[636] US",
						"Hotwire[1408] US", "Hotwire[636] US", "Hotwire[1408] US", "Hotwire[636] US", "Hotwire[1408] US", "Wotif[1320] AU", "Wotif[1320] NZ",
						"Wotif[1320] AU", "BarceloHoteles[275] ES", "BarceloHoteles[275] MX", "BarceloHoteles[275] US", "Hotelsclick[654] AR",
						"Scandic Hotels[850] SE", "Hotelopia[9] ES", "Destinia[341] ES", "Hilton[26] UK", "Accor[14] IT", "Hostelworld[500] ES",
						"Cheaptickets[1382] US", "Priceline_Sub[1692] UK", "AirasiaGo[518] MY", "ZenHotels[1756] RU", "HotusaGroup[67] ES",
						"HotelQuickly[1856] MY", "lol.travel[1662] IT", "Eurostars[418] ES", "BookGreece[1740] GR", "Ostrovok[1210] RU",
						"ThomasCook[277] DE", "Neckermann[1314] DE", "Hotelsclick[654] MX", "Scandic Hotels[850] NO", "Hotelopia[9] UK",
						"Destinia[341] DE", "Hilton[26] AU", "Accor[14] ES", "Hostelworld[500] IT", "Cheaptickets[1382] US", "Priceline_Sub[1692] DK",
						"AirasiaGo[518] MY", "ZenHotels[1756] DE", "HotusaGroup[67] FR", "HotelQuickly[1856] US", "lol.travel[1662] UK", "Eurostars[418] IT",
						"BookGreece[1740] UK", "Ostrovok[1210] RU", "ThomasCook[277] AT", "Neckermann[1314] DE", "Hotelsclick[654] AA", "Scandic Hotels[850] FI",
						"Hotelopia[9] FR", "Destinia[341] FR", "Hilton[26] RU", "Accor[14] FR", "Hostelworld[500] DE", "Cheaptickets[1382] US",
						"Priceline_Sub[1692] SE", "AirasiaGo[518] MY", "ZenHotels[1756] IN", "HotusaGroup[67] IT", "HotelQuickly[1856] DE", "lol.travel[1662] NL",
						"Eurostars[418] FR", "BookGreece[1740] RS", "Ostrovok[1210] RU", "ThomasCook[277] AT", "Neckermann[1314] DE"];
		var partnerC = ["IHG[13] UK", "LeadingHotels[361] DE", "NordicChoice[968] SE", "Marriott[524] US", "B & B Hotels[412] DE", "CheapTickets[1382] US", "Iberostar[540] UK", "TravelCharme[862] DE", "Room Mate Hotels[1850] FR",
						"Atrapalo_new[383] ES", "hot.es[930] US", "Ramada[436] DE", "AOHostels[1380] DE", "Ayre[1242] ES", "Servigroup[910] UK", "Jumeirah Hotels[786] RU", "Hotelsnl[66] NL", "prizeotel[1600] DE", "H10[754] ES",
						"LeadingHotels[361] DE", "WIHP[371] US", "adrialin[1448] DE", "FastbookingDC[367] JP", "Mirai[502] ES", "Travelclick[111] MX", "Sabre[1200] US",
						"EurostarsDirectConnect[516] ES", "Rezidor_RadissonBlu[844] UK", "BookCyprus[301] UK", "Marriott_JW Marriott[594] US", "Pentahotels[744] UK", "CHI_ComfortInn[1530] FR", "Nozio[359] IT",
						"CHI_Quality[1534] IT", "H_Garden Inn[1084] UK", "Marriott_Autograph Collection[598] US", "Leonardo[1054] DE", "Shangri-La Hotels[944] AU", "Belmond Enhanced[1134] US",
						"CHI_Clarion[1528] FR", "Availpro[430] FR", "Marriott_Towne Place Suites[614] US", "Corus Hotels[770] UK", "FC Regal Hotels[1494] HK", "Reservalia[1670] CO", "H_Conrad[1088] UK", "MountVacation[1100] IT",
						"ihg_indigo[79] UK", "DerbyIndividual[1976] UK", "Initalia[85] IT", "Marriott_AC Hotels[602] US", "Zenrooms[1846] ID", "Marriott_Delta Hotels[1486] CA", "H_Waldorf Astoria[1090] UK",
						"ihg_candlewood[582] US", "ihg_candlewood[75] US", "Marriott_Marriott Vacation Club[616] US", "Design Hotels[826] UK", "Rezidor_ParkInn[838] UK", "25Hours[1050] DE",
						"VerticalBooking[544] IT", "ihg_StayBridge[83] US", "Gardapass[1332] DE", "Marriott_Protea Hotels[1228] ZA", "LifeClass Hotels[660] SI",
						"TiCaTi[1902] FR", "Playasol[1722] IT", "Marriott_Gaylord Hotels[1222] US", "Marriott_Executive Apartments[1224] PL", "ole Hotels[1216] ES", "JenHotels[1452] MY", "Onyx Hotels[1668] TH",
						"HotelgrouperV2[1840] UK", "MmOne[576] DE", "Marriott_MOXY[1226] DE", "Only you[2042] ES",
						"otel.com[82] CN", "Traders[948] MY", "ParkRoyalHotels[1868] AU", "Kerry[946] RU", "Bastion Hotels[1848] NL", "GoNorthCyprus[1742] UK", "Olimar[353] DE",
						"CHD_Comfort_Inn[1514] US", "SWNA_LColl[1640] US", "CHC_Comfort_Inn[1878] CA", "JA Hotels[1290] UK", "Hotelius[375] ES", "myTour[1752] VN", "Ticket.se[1076] SE", "dnata[916] AE",
						"VHG_Americas Best Value Inn[1072] US", "HotelSpecials Scandinavia[810] SE", "JollyTur[1572] TR", "CHD_Econo_Lodge[1522] US", "Bentour[1730] DE", "FRHI_Raffles[1700] UK", "CHI_Ascend[1666] FR",
						"Melia_CN[1234] CN", "Yatra.com[764] IN", "CHI_ComfortSuite[1532] FR", "onetwotrip[1586] RU", "Etstur[1620] TR", "Skiplanet[2036] FR", "Vacatia.com[1754] US",
						"Stayforlong[1912] ES", "bookIt[1080] US", "SWNA_Aloft[1644] US", "TravelBook.ph[1950] PH", "La Quinta Enhanced[896] US", "OzonTravel[420] RU", "SWNA_St Regis[1636] US", "TabletHotels[642] US",
						"Tatilsepeti_Int[520] TR", "ViajarV2[1828] ES", "Galahotels[1908] CH", "Splitty Travel[2006] IE", "tourico[47] US", "Netaffinity[886] IE", "Bed&Snow[2034] ES",
						"BBHotelsFrance[732] FR", "OstrovokV2[1210] RU", "OMNI Hotels[1616] US", "IHG_Hualuxe[1304] CN", "VNTrip[1760] VN", "Tui Peakwork[702] DE", "HotelUrbano[1062] BR", "lastminute.com.au[796] AU",
						"VHG_Canadas Best Value Inn[1074] CA", "H_Grand_US[1368] US", "17U[1180] CN", "profitroom[1664] PL", "Nusatrip[872] ID", "TouricoLastminuteTravel[319] FR",
						"JTB[1140] JP", "SWNA_Sheraton[1630] US", "Wing On Travel[1316] HK", "CHC_Ascend[1874] CA", "H_Embassy_US[1362] US", "NeoUK_Montcalm[1414] UK", "H_Curio_US[1364] US", "Jovago[972] ZA",
						"bestWestern_DE[1122] DE", "mr&mrssmith[1432] UK", "SWNA_Westin[1642] US", "CHC_Quality_Inn[1886] CA", "SWNA_Element[1646] US", "Citadines[804] FR", "eLong Domestic[802] CN", "cheapticketsv2[1582] US",
						"pegipegi[1184] ID", "Tatilsepeti_Tr[522] TR", "Pegasus[448] DE", "Visit Barbados[1962] UK", "SWNA_FourPoints[1638] US", "CHC_Econo_Lodge[1882] CA", "priceline_sub[1692] UK",
						"superbreak[712] UK", "qmango[1174] CN", "CHC_Mainstay[1884] CA", "AirasiaGo[518] MY", "H_Waldorf_US[1358] US", "tatil.com[728] TR", "h_curio[1926] US", "MuchoViaje[1712] ES",
						"CHC_ComfortSuite[1880] CA", "Jalan[1698] JP", "Weekendesk[782] ES", "Reservento[80] DE", "Elumbus[1206] DE", "SWNA_LeMeridien[1632] US",
						"GetaRoom[267] US", "Ena[1940] JP", "CHC_Suburban[1892] CA", "Appleworld[1250] JP", "CHD_Quality_Inn[1518] CA", "bestWestern_FR[1064] FR", "ThomasCookBEPW[1922] FR", "Lastminute International[74] UK",
						"AmericInn[1450] US", "Dirs21[688] DE", "CHD_Ascend[1504] US", "Dorint[656] DE", "H_Hampton Inn_US[1354] US", "Rurubu[1196] JP", "Dolomiti.org[868] IT",
						"neckermann_be[1674] BE", "oyo[1750] IN", "Reservit[828] FR", "laterooms[28] UK", "Hotels4Everyone[1680] US", "JTB Hawaii[1982] JP", "CHC_Clarion[1876] CA", "101hotels.ru[1904] RU", "Groupon[1736] US",
						"SWNA_W Hotels[1634] US", "loveholidays.com[2010] UK", "CHD_Rodeway_Inn[1510] US", "H_Homewood_US[1360] US", "HotelTonight[1770] US", "Vrijuit[1464] NL",
						"GreenTree[1284] CN", "Extended Stay[1394] US", "Mondial[788] AT", "Reembolsing[2054] ES", "BestWestern_ROW[1838] DE", "IHG_Ana[1300] JP", "skooshV2[1710] NO", "NeoUK_Shaftesbury[1416] UK",
						"Qantas[1978] AU", "CHD_Mainstay[1520] US", "CHD_Cambria[1502] US", "Marriott_Conference Center[1220] US", "travelbag[1496] UK", "Roomer[1402] UK", "Tempus[1218] CN", "BBHotelsItaly[1376] IT",
						"CHC_Sleep_Inn[1890] CA", "snoozee_sales[774] DE", "Airtours Peakwork V2[2044] DE", "HotelSpecials[790] DE", "Netflights[892] UK", "WelcomeHotels[1614] DE", "RumboV2[1814] IT",
						"Ameropa Peakwork[1372] DE", "CHD_Clarion[1516] US", "MagicCostaBlanca[1338] ES", "H_Doubletree_US[1348] US", "Falkensteiner[1118] AT", "FC rhhoteles[1564] UK", "Cleartrip[856] IN",
						"TOP International[450] DE", "Dadeda[1474] PT", "morgansHotelGroup[1938] UK", "H_Home2_US[1366] US", "bestWestern_IT[1308] IT", "VHG_Lexington Inns[1068] US", "H_Garden Inn_US[1352] US", "Mexico Destinos[1806] MX",
						"mister aladin[1780] ID", "Doyle Collection[1270] IE", "ThomasCook[277] DE", "CHD_ComfortSuite[1512] US", "NeoUK_Parkgrand[1418] UK", "Eshet[1948] IL", "Tui Peakwork[702] AT", "H_Conrad_US[1356] US",
						"CHD_Sleep_Inn[1508] US", "SnowTrex[1804] DE", "Ikyu[1910] JP", "Dreambooking[1388] DK", "FRHI_Fairmont[1704] US", "Tui LTE[1802] ES", "Alltours Peakwork[1236] DE", "ARCOTEL[1238] DE", "Geostar[1764] PT",
						"ViajesElCorteIngles_v2[852] FR", "Cityzenbooking[385] FR", "Neckermann[1314] DE", "neckermann_nl[2058] NL", "Keytel[424] ES", "PH Hotels[1626] UK", "HolidayMe[1980] AA", "h_canopy[1924] UK",
						"Tatilbudur[1860] TR", "FRHI_Swissotel[1702] US", "DerbyIBC[2002] US", "Ltur Peakwork[666] DE", "eholiday.pl[1470] PL", "MontigoV2[1566] DE", "Treebo Hotels[1894] IN", "CHD_Suburban[1506] US",
						"VoyagesSNCFv2[718] FR", "Rakuten[1052] JP", "Bahia Principe[1484] ES", "jackrabbit[990] CA", "CHC_Rodeway[1888] CA", "Travelguru[676] IN", "HotelTravel[265] US",
						"Zoover[317] DE", "Orbitz[528] US", "helloworld[938] AU" ];
		//alert(partnerAPlus.length + "  " + partnerA.length +"  " +  partnerB.length +"  " +  partnerC.length);
		// Weighted random array functions
		var rand = function(min, max) {
			return Math.random() * (max - min) + min;
		};

		var getRandomItem = function(list, weight) {
			var total_weight = weight.reduce(function (prev, cur, i, arr) {
				return prev + cur;
			});

			var random_num = rand(0, total_weight);
			var weight_sum = 0;

			for (var i = 0; i < list.length; i++) {
				weight_sum += weight[i];
				weight_sum = +weight_sum.toFixed(2);
				if (random_num <= weight_sum) {
					return list[i];
				}
			}
		};

		// Autofiller after generate button is clicked.
		var autoFiller = function(myChoice, env) {	
			textNodes[1].value = myChoice;
			if(env === "Mobile"){
				toggleNodes[1].click();
			} else {
				toggleNodes[0].click();
			}
		};

		//Tool's main div
		var zNode = document.createElement('div');
		zNode.setAttribute ('id', 'myContainer');
		zNode.className = "md_card";
		document.body.appendChild(zNode);

		var titleBar = document.createElement('div');
		titleBar.id = "titleBar";
		zNode.appendChild(titleBar);
		
		var title = document.createElement('H2');
		title.id = "title";
		var titleText = document.createTextNode("Roger Box");
		title.appendChild(titleText);
		titleBar.appendChild(title);

		// Create random partner name and locale for the testers
		var textContent = document.createElement("p");

		//get survey count
		chrome.storage.local.get('rogerCounter', function (result) {
			var counter;
			if(result.rogerCounter === undefined){
				counter = "0";
			}else{
				counter = result.rogerCounter;
			}
			textContent.innerHTML = "Click to generate advertiser and locale!" + "</br>" + "</br>" +
			" <b>Total:</b> " + counter;
		});	
		textContent.id = "textContent";
		zNode.appendChild(textContent);

		// Create and append generate button to zNode
		var myGenerate = document.createElement("input");

		var myChoice;
		var random_env;

		myGenerate.id = "myGenerate";
		myGenerate.className = "md_btn";
		myGenerate.type = "button";
		myGenerate.value = "Generate";
		myGenerate.onclick = function(){
			var random_item = getRandomItem(list, weight);
			random_env = getRandomItem(list_env, weight_env);
			myChoice = random_item;
			switch (random_item) {
				case 'partnerAPlus':
					myChoice = partnerAPlus[Math.floor(Math.random()*7)];
					break;
				case 'partnerA':
					myChoice = partnerA[Math.floor(Math.random()*29)];
					break;
				case 'partnerB':
					myChoice = partnerB[Math.floor(Math.random()*114)];
					break;
				case 'partnerC':
					myChoice = partnerC[Math.floor(Math.random()*308)];
					break;
				default:
					myChoice = partnerAPlus[Math.floor(Math.random()*7)];
					break;
			}
			var locale = (myChoice.slice(-2));
			var advertiser = myChoice.substring(0, myChoice.length-2);
			autoFiller(locale, random_env);
			textContent.innerHTML = "<b>Advertiser:</b> " + advertiser + "<br>" + 
			"<b>Locale:</b> " + locale + "<br>" + 
			"<b>Environment:</b> " + random_env + "<br>" + 
			"<b>Platform Link:</b> " + "<br>"; // +
			//"<b>Debugger Link:</b> ";

			for(var x = 0; x < sd_locales.length; x++){
				if(sd_locales[x].locale === locale){
					linkText.nodeValue= sd_locales[x].domain;	
					myTrivagoURL.href = "https://" + sd_locales[x].domain;
					myTrivagoURL.style.visibility = "visible";	
				}
			}
			//myDebuggerURL.style.visibility = "visible";				
			chrome.storage.local.set({"currentSearch": [advertiser,locale]});
			//for testing purposes
			//saveCount();
			//saveToHistory();		
		};
		zNode.appendChild(myGenerate);

		// Create and append reset button to zNode
		var myHistory = document.createElement("input");
		myHistory.id = "myHistory";
		myHistory.type = "button";
		myHistory.className = "md_btn";
		myHistory.value = "History";
		myHistory.onclick = function(){
			chrome.storage.local.get('rogerHistory', function(result){
				if(result.rogerHistory == undefined){
					alert("No history");
				}else{
					var historyArray = result.rogerHistory.split(',');
					var historyFormated = "";
					for(var x = 0; x < historyArray.length; x++){
						var counter = x + 1;
						historyFormated = historyFormated + counter + ": " +  historyArray[x] + "\n";					
					}
					var deleteHistory = prompt(historyFormated + "\n" + "\n" + "Type 'delete' to delete history");
					if(deleteHistory === "delete"){
						alert("History was deleted.")
						chrome.storage.local.set({'rogerCounter' : 0});			
						chrome.storage.local.set({'rogerHistory' : null});			
					}						
				}	
			});
		};
		zNode.appendChild(myHistory);

		// Create and append close box to zNode
		var myClose = document.createElement("span");
		myClose.id = "myClose";
		myClose.innerHTML = "x";
		myClose.onclick = function(){
			zNode.style.display = 'none';
		};
		zNode.appendChild(myClose);

		var myTrivagoURL = document.createElement('a');
		var linkText = document.createTextNode("");
		myTrivagoURL.appendChild(linkText);
		myTrivagoURL.title = "Platform Link";		
		myTrivagoURL.id = "myTrivagoURL";
		myTrivagoURL.href = "http://trivago.com";
		myTrivagoURL.style.visibility = "hidden";
		zNode.appendChild(myTrivagoURL);

		var myDebuggerURL = document.createElement('a');
		var linkText2 = document.createTextNode("");
		myDebuggerURL.appendChild(linkText2);
		myDebuggerURL.title = "Debugger Link";		
		myDebuggerURL.id = "myDebuggerURL";
		myDebuggerURL.href = "http://trivago.com";
		myDebuggerURL.style.visibility = "hidden";
		zNode.appendChild(myDebuggerURL);
	}
})();