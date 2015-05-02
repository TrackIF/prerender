var http = require('http');
var async = require('async');

http.globalAgent.maxSockets = 50;

var getSite = function getSite(url, cb) {
  var statusCode, err;
  var opts = {
    hostname: 'localhost',
    port: 3000,
    path: '/'+encodeURIComponent(url),
    auth: 'user:pass'
  };
  http.get(opts, function(res) {
    console.log('Got response: ' + res.statusCode);
    statusCode = res.statusCode;
  }).on('error', function(e) {
    console.log('Got error for ', opts, ' error: ', e.message);
    err = e;
  });
  cb(err, statusCode);
};

var urls = [
  'http://www.cymax.com/Comon/nobot/Hillsdale-Marcella-Daybed-with-Roll-Out-Trundle-in-Brown-Leather-1518DBT.htm',
  'http://www.cymax.com/Daily-Deals--C100539.htm',
  'http://www.cymax.com/Home-Style-Cabin-Creek-Bistro-Table-in-Multi-step-Chestnut-5411-35.htm',
  'http://www.cymax.com/Hooker-Furniture-Sanctuary-Fretwork-Chest-in-Pearl-Essence-3023-85001.htm',
  'http://www.cymax.com/Monarch-Twin-Size-Bed-Frame-in-Silver-with-Post-Legs-I-2390S.htm',
  'http://www.cymax.com/Office-Star-Westbrook-Pub-Table-in-Espresso-WB432.htm',
  'http://www.cymax.com/Pub-Tables--C689.htm',
  'http://www.cymax.com/Pulaski-Accent-Chest-in-Rustic-Natural-597003.htm',
  'http://www.cymax.com/Pulaski-Chairside-Cabinet-in-Miela-DS-766008.htm',
  'http://www.cymax.com/ZUO-Bookcases--C224-950.htm',
  'http://www.cymax.com/Zuo-Civic-Center-Nesting-Table-ins-Distressed-Natural-98121.htm',
  'http://www.cymax.com/Zuo-Fort-Mason-6-Drawer-Sideboard-Distressed-Natural-98105.htm',
  'http://www.cymax.com/Zuo-Hunters-Point-Sideboard-Distressed-Natural-98101.htm',
  'http://www.cymax.com/Zuo-Mission-Bay-Tall-6-Level-Shelf-in-Distressed-Natural-Finish-98143.htm',
  'http://www.cymax.com/Zuo-Mission-Bay-Wide-2-Level-Shelf-Distressed-Natural-98140.htm',
  'http://www.cymax.com/Zuo-Nob-Hill-Loveseat-in-Charcoal-Gray-98097.htm',
  'http://www.cymax.com/Zuo-Twin-Peaks-Bar-Table-in-Distressed-Natural-98180.htm',
  'http://www.ellamoss.com/boheme-lace-trim-tank/d/5884',
  'http://www.ellamoss.com/cara-stripe-dress/d/5542',
  'http://www.ellamoss.com/carmela-stripe-dress/d/5251',
  'http://www.ellamoss.com/courtney-stripe-bodycon-dress/d/5586',
  'http://www.ellamoss.com/farrah-dress/d/5474',
  'http://www.ellamoss.com/lanai-dress/d/5132',
  'http://www.ellamoss.com/lily-lace-zip-dress/d/5138',
  'http://www.ellamoss.com/moselle-tank/d/5847',
  'http://www.ellamoss.com/printed-short-sleeve-tee/d/5254',
  'http://www.ellamoss.com/stella-circle-trim-tank/d/5903',
  'http://www.ellamoss.com/stella-ruffle-neck-top/d/5440',
  'http://www.ellamoss.com/totem-print-top/d/5786',
  'http://www.fleetfarm.com/detail/-1-0-light-up-electronic-dartboard/0000000094990',
  'http://www.fleetfarm.com/detail/-10-drawer-craft-cart/0000000202046',
  'http://www.fleetfarm.com/detail/-10-in-glass-diamond-gazing-ball/0000000055895',
  'http://www.fleetfarm.com/detail/-10-in-swirl-gazing-ball-red/0000000007771',
  'http://www.fleetfarm.com/detail/-100-biodegradable-fire-extinguishing-foam/0000000088958',
  'http://www.fleetfarm.com/detail/-100-ft-fertilizer-suction-discharge-hose/0000000026190',
  'http://www.fleetfarm.com/detail/-12-drawer-craft-cart/0000000202045',
  'http://www.fleetfarm.com/detail/-14-full-main-breaker-ch-loadcenter/0000000044721',
  'http://www.fleetfarm.com/detail/-15-in-egg-planter-red/0000000200314',
  'http://www.fleetfarm.com/detail/-18-gal-abrasive-cabinet/0000000006954',
  'http://www.fleetfarm.com/detail/-36-in-1-2-hp-diamond-brite-drum-fan/0000000033328',
  'http://www.fleetfarm.com/detail/-42-in-3-4-hp-galvanized-drum-fan/0000000074038',
  'http://www.fleetfarm.com/detail/-4400-lb-pallet-jack/0000000076154',
  'http://www.fleetfarm.com/detail/-50-ft-ag-300-rubber-spray-hose/0000000026022',
  'http://www.fleetfarm.com/detail/-6-ft-blow-mold-bench/0000000202072',
  'http://www.fleetfarm.com/detail/-6-pc-anchor-kit-with-drive-rod/0000000046694',
  'http://www.fleetfarm.com/detail/-8-qt-all-in-one-multi-cooker/0000000034503',
  'http://www.fleetfarm.com/detail/-adjustable-elevated-pet-bowl/0000000028856',
  'http://www.fleetfarm.com/detail/-alligator-belt-lacing/0000000033036',
  'http://www.fleetfarm.com/detail/-aluminum-electric-fence-wire/0000000046866',
  'http://www.fleetfarm.com/detail/-apex-heart-rate-monitor/0000000074731',
  'http://www.fleetfarm.com/detail/-ashcourt-bar-stool/0000000076862',
  'http://www.fleetfarm.com/detail/-atv-u-bolt/0000000012573',
  'http://www.fleetfarm.com/detail/-auto-prime-xr/0000000087317',
  'http://www.fleetfarm.com/detail/-backyard-grilling/0000000004603',
  'http://www.fleetfarm.com/detail/-big-buck-tire-swing/0000000074734',
  'http://www.fleetfarm.com/detail/-bird-cardinal-water-fountain/0000000088036',
  'http://www.fleetfarm.com/detail/-boys-slugger-compression-boxer-w-cup-white/0000000087146',
  'http://www.fleetfarm.com/detail/-buddy-s-best-3-pc-set/0000000029127',
  'http://www.fleetfarm.com/detail/-cabela-s-dangerous-hunts-2011-for-xbox-360/0000000086174',
  'http://www.fleetfarm.com/detail/-camera-observation-system/0000000082769',
  'http://www.fleetfarm.com/detail/-cast-iron-hexagon-dumbbell/0000000084026',
  'http://www.fleetfarm.com/detail/-catt-plex-herbicide/0000000070780',
  'http://www.fleetfarm.com/detail/-chestnut-maize-high-back-dining-chair/0000000086148',
  'http://www.fleetfarm.com/detail/-clock/0000000092188',
  'http://www.fleetfarm.com/detail/-clock/0000000092252',
  'http://www.fleetfarm.com/detail/-curve-n-cline-gambrel/0000000086323',
  'http://www.fleetfarm.com/detail/-deluxe-hose-hanger-with-faucet/0000000039457',
  'http://www.fleetfarm.com/detail/-dive-curve-stickers-rapala-deep-divers/0000000089146',
  'http://www.fleetfarm.com/detail/-dive-curve-stickers-reef-runner/0000000089149',
  'http://www.fleetfarm.com/detail/-double-bit-axe/0000000093178',
  'http://www.fleetfarm.com/detail/-dove-n-air-decoy-with-stake/0000000092883',
  'http://www.fleetfarm.com/detail/-easy-pour-turbo-brass-corn-cob-cleaning-media/0000000087326',
  'http://www.fleetfarm.com/detail/-fence-fork-t-post-clip-installation-tool/0000000204260',
  'http://www.fleetfarm.com/detail/-fishing-tips-tricks/0000000062234',
  'http://www.fleetfarm.com/detail/-flat-panel-tv-anti-tip-strap/0000000080643',
  'http://www.fleetfarm.com/detail/-fleece-lined-neoprene-gloves/0000000086324',
  'http://www.fleetfarm.com/detail/-flex-6-round-to-4-flat-adapter/0000000076670',
  'http://www.fleetfarm.com/detail/-foxxy-fox-decoy/0000000005271',
  'http://www.fleetfarm.com/detail/-full-motion-26-47-in-tv-mount/0000000080640',
  'http://www.fleetfarm.com/detail/-girl-at-water-fountain/0000000088037',
  'http://www.fleetfarm.com/detail/-gnome-with-welcome-sign/0000000084946',
  'http://www.fleetfarm.com/detail/-green-bay-packers-adult-bib-overalls/0000000086272',
  'http://www.fleetfarm.com/detail/-green-bay-packers-wrap-design-mug/0000000088002',
  'http://www.fleetfarm.com/detail/-grill-cover/0000000093093',
  'http://www.fleetfarm.com/detail/-gun-digest-2013-67th-edition/0000000078722',
  'http://www.fleetfarm.com/detail/-heavy-duty-hose-wagon/0000000039476',
  'http://www.fleetfarm.com/detail/-iowa-hawkeyes-hooded-sweatshirt-gold/0000000207167',
  'http://www.fleetfarm.com/detail/-iowa-hawkeyes-metal-street-sign/0000000093043',
  'http://www.fleetfarm.com/detail/-iowa-state-cyclones-freezer-mug/0000000093071',
  'http://www.fleetfarm.com/detail/-kenai-neo-full-finger-waterproof-gloves/0000000091609'
];

console.log('Expect ',urls.length,' loops');
async.each(urls, function(url, cb){
  getSite(url, function(err, code){
    if (err){
      cb(err);
    }
  });
}, function error(err){
  if (err) {
    console.error('Error',err);
  } else {
    console.log('Done!')
  }
});
