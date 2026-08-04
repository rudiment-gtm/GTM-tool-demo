// All demo data lives here. Swap these for real API calls when the backend exists.

// Real business records pulled from a Google Maps export (Wasatch Front + Utah County auto/service businesses).
// Coordinates are approximated from each city center (no live geocoding available at build time) - swap for a real geocoder when the backend lands.
export const BUSINESSES = [
  { name: 'Burt Brothers Tire & Service', address: '4032 N Forestdale Dr, Park City, UT 84098, USA', phone: '+1 435-571-0076', website: 'https://www.burtbrothers.com/locations/4032-n-forestdale-dr-park-city-ut-84098', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJlR0oicUSUocRfeu8P0WqHuQ', description: '', rating: 4.8, reviews: 711, lat: 40.632921, lng: -111.498543 },
  { name: 'O\'Reilly Auto Parts', address: '430 S Main St, Heber City, UT 84032, USA', phone: '+1 435-654-6255', website: 'https://locations.oreillyauto.com/en-us/ut/hebercity/autoparts-3664.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJV-a1NZf1TYcROfqpEOVSu7g', description: '', rating: 4.3, reviews: 272, lat: 40.512076, lng: -111.419323 },
  { name: 'NAPA Auto Parts', address: '4212 N Forestdale Dr Ste 800, Park City, UT 84098, USA', phone: '+1 435-333-6272', website: 'https://www.napaonline.com/en/UT/Park-City/store/800889?cid=pl_jobber_google_dac_800889_ao', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJD4Mq_iYTUocRJ588Nk59MIE', description: '', rating: 4.1, reviews: 82, lat: 40.642499, lng: -111.51345 },
  { name: 'AutoZone Auto Parts', address: '805 S Main St, Heber City, UT 84032, USA', phone: '+1 435-654-1772', website: 'https://www.autozone.com/locations/ut/heber-city/805-s-main-st.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:4065', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ_RR9H5f1TYcRoPcRpDGsEBY', description: '', rating: 4.2, reviews: 264, lat: 40.517407, lng: -111.418888 },
  { name: 'Karl Malone Chrysler Dodge Jeep Ram', address: '255 S Main St, Heber City, UT 84032, USA', phone: '+1 801-989-3797', website: 'https://www.malonechryslerdodgejeep.com/?utm_source=google&utm_medium=organic+&utm_campaign=google-business-profile', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJFYFF_ZD1TYcR--YHqJQE0ZM', description: '', rating: 4.7, reviews: 2127, lat: 40.517697, lng: -111.410523 },
  { name: 'Big O Tires', address: '898 S Main St, Heber City, UT 84032, USA', phone: '+1 435-709-8176', website: 'https://www.bigotires.com/location/ut/heber-city/898-s-main-st-84032/044264?utm_source=google&utm_medium=maps', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJq8_mIr31TYcReUdLiRgdyzc', description: '', rating: 4.4, reviews: 642, lat: 40.518354, lng: -111.429034 },
  { name: 'Les Schwab Tire Center', address: '1160 S Main St, Heber City, UT 84032, USA', phone: '+1 435-657-2750', website: 'https://www.lesschwab.com/stores/ut/heber-city/1160-s-main-st?utm_source=google&utm_medium=organic&utm_campaign=gmb-homepage', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJKTgwr7z1TYcRmZ0WN_UOSKE', description: '', rating: 4.1, reviews: 407, lat: 40.514428, lng: -111.404581 },
  { name: 'Jiffy Lube Oil Change & Multicare', address: '510 N Main St, Heber City, UT 84032, USA', phone: '+1 435-654-2780', website: 'https://www.jiffylube.com/locations/ut/heber-city/3433', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ-XZ9Aon1TYcRo1FPJepzEI0', description: '', rating: 4.5, reviews: 711, lat: 40.509915, lng: -111.4307 },
  { name: 'Mercer Automotive', address: '1155 Iron Horse Dr, Park City, UT 84060, USA', phone: '+1 435-649-2886', website: 'https://www.mercer-autorepair.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJj8sIEGFtUocRn0FwGZZAo6o', description: '', rating: 4.4, reviews: 238, lat: 40.655878, lng: -111.508197 },
  { name: 'Labrum Ford, Inc.', address: '901 S Main St, Heber City, UT 84032, USA', phone: '+1 435-654-4910', website: 'http://www.labrumford.net/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJUxKsJr31TYcRhxxQ4fzTyS8', description: '', rating: 4.8, reviews: 659, lat: 40.499603, lng: -111.409222 },
  { name: 'NAPA Auto Parts - Wasatch Auto Parts', address: '105 N Main St, Heber City, UT 84032, USA', phone: '+1 435-654-0220', website: 'https://www.napaonline.com/en/UT/Heber-City/store/39277?cid=pl_jobber_google_dac_39277_ao', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJn_yGvI_1TYcR0Gd81O-S8qs', description: '', rating: 4.6, reviews: 110, lat: 40.522488, lng: -111.398927 },
  { name: 'Valvoline Instant Oil Change', address: '1229 S 300 W, Heber City, UT 84032, USA', phone: '+1 435-660-4340', website: 'https://store.vioc.com/ut/heber-city/1229-s-300-w?utm_source=google&utm_medium=local&utm_campaign=localsearch', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ9dUjHOP1TYcRyeyK7Fq7eJ8', description: '', rating: 4.4, reviews: 114, lat: 40.501305, lng: -111.407356 },
  { name: 'Mercer Auto Spa', address: '4212 N Forestdale Dr #700, Park City, UT 84098, USA', phone: '+1 435-333-6588', website: 'https://mercer-autospa.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJAyoCgWwTUocRUjGGJsSHCgs', description: '', rating: 4.6, reviews: 19, lat: 40.660775, lng: -111.500888 },
  { name: 'Carquest Auto Parts - J&S AUTO INC. KAMAS CARQUEST', address: '235 S Main St, Kamas, UT 84036, USA', phone: '+1 435-783-6777', website: 'https://www.carquest.com/locations/ut/kamas/14802/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJWzMfxPQFUocRiKGJKxPcaEg', description: '', rating: 4.5, reviews: 111, lat: 40.646195, lng: -111.263085 },
  { name: 'Carquest Auto Parts - J&S AUTO INC.HEBER CITY CARQUEST', address: '434 N Main St, Heber City, UT 84032, USA', phone: '+1 435-654-1520', website: 'https://www.carquest.com/locations/ut/heber-city/15341/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJARv304_1TYcRWDPnThQWz_Q', description: '', rating: 4.8, reviews: 64, lat: 40.50815, lng: -111.417679 },
  { name: 'A Rusted Development', address: '230 N Main St, Kamas, UT 84036, USA', phone: '+1 435-565-1975', website: 'https://ardoffroad.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJi-Z_mC71TYcRXKODk1ttuus', description: '', rating: 4.7, reviews: 127, lat: 40.654, lng: -111.278669 },
  { name: 'Walmart Auto Care Center', address: '1274 US-189, Heber City, UT 84032, USA', phone: '+1 435-709-3098', website: 'https://www.walmart.com/store/4696-heber-city-ut/auto-care-center/?veh=seo_loc', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJzZ6c_6T1TYcR2DX9hp6Oa2c', description: '', rating: 3.5, reviews: 86, lat: 40.502976, lng: -111.429861 },
  { name: 'Tracy\'s Auto Repair', address: '110 N Main St, Heber City, UT 84032, USA', phone: '+1 435-654-7099', website: 'https://www.tracysautorepair.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJRWZVFKT1TYcRHToqyBpOHMk', description: '', rating: 4.1, reviews: 90, lat: 40.489767, lng: -111.401649 },
  { name: 'Rearden Auto Service', address: '4437 N Forestdale Dr, Park City, UT 84098, USA', phone: '+1 435-604-5800', website: 'https://reardenracing.com/auto_service.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJeaPHSaNrUocR5fyGbzoylSo', description: '', rating: 5.0, reviews: 16, lat: 40.647735, lng: -111.495925 },
  { name: 'Dirt Tires & Donuts Garage', address: '4376 N Forestdale Dr #4, Park City, UT 84098, USA', phone: '+1 424-634-1497', website: 'http://www.dirttiresanddonutsgarage.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJWYvaMg0TUocRoRo3HAUBkOI', description: '', rating: 5.0, reviews: 35, lat: 40.634592, lng: -111.483972 },
  { name: 'Larry H. Miller Toyota Murray', address: '5650 S State St, Murray, UT 84107, USA', phone: '+1 801-590-0640', website: 'https://www.larryhmillertoyota.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJO8MkSI6JUocRqNJAHC_YGyE', description: '', rating: 4.5, reviews: 10160, lat: 40.653285, lng: -111.899207 },
  { name: 'Pick-n-Pull', address: '585 W 3300 S, South Salt Lake, UT 84115, USA', phone: '+1 801-264-0359', website: 'https://www.picknpull.com/locations/74/salt-lake-city-ut?utm_source=google&utm_medium=organic&utm_campaign=GMB-Salt-Lake-City', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJc8dV9heLUocReBLTZqdpEqc', description: 'Source for recycled auto parts, salvage vehicles & scrap metal (also buys old cars & trucks).', rating: 3.1, reviews: 844, lat: 40.730251, lng: -111.885114 },
  { name: 'Larry H. Miller Ford Draper', address: '11442 Lone Peak Pkwy, Draper, UT 84020, USA', phone: '+1 801-742-5237', website: 'http://www.lhmforddraper.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJYdb262SIUocRqksm6jm58D0', description: '', rating: 4.2, reviews: 9333, lat: 40.50671, lng: -111.848371 },
  { name: 'AutoZone Auto Parts', address: '3750 S State St, South Salt Lake, UT 84115, USA', phone: '+1 801-262-4448', website: 'https://www.autozone.com/locations/ut/south-salt-lake/3750-state-st.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:858', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJJf3gwFuKUocRXeF39xaiflk', description: '', rating: 4.2, reviews: 1726, lat: 40.707016, lng: -111.889453 },
  { name: 'Larry H. Miller Chrysler Jeep Dodge Ram Sandy', address: '10905 S Auto Mall Dr, Sandy, UT 84070, USA', phone: '+1 801-590-0465', website: 'https://www.lhmchryslerjeep.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJv__C6bCHUocRthdOODUilNw', description: '', rating: 4.5, reviews: 7208, lat: 40.563465, lng: -111.837533 },
  { name: 'Stockton 12 Honda', address: '10860 S Auto Mall Dr, Sandy, UT 84070, USA', phone: '+1 866-942-5576', website: 'https://www.stockton12honda.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJjwBYzbCHUocR8963sdpYs2k', description: '', rating: 4.6, reviews: 5858, lat: 40.564063, lng: -111.842458 },
  { name: 'Jerry Seiner Kia South Jordan', address: '10301 S Jordan Gateway, Sandy, UT 84070, USA', phone: '+1 801-506-6283', website: 'https://www.seinerkiasj.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJrXKC48qHUocRuuuqm8dqmuk', description: '', rating: 4.6, reviews: 3215, lat: 40.551051, lng: -111.850374 },
  { name: 'Larry H. Miller Honda Murray', address: '5808 S State St, Murray, UT 84107, USA', phone: '+1 801-618-4711', website: 'https://www.lhmhonda.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJew07TpCJUocR3WEv0cHhsis', description: '', rating: 4.5, reviews: 5942, lat: 40.672392, lng: -111.884132 },
  { name: 'Cycle Gear', address: '11473 S State St, Draper, UT 84020, USA', phone: '+1 801-553-2150', website: 'https://www.cyclegear.com/stores/cycle-gear-draper-utah-store-70', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJz9Xsi6aHUocRyCzs64pLvHk', description: 'Retail chain selling motorcycle parts along with related clothing & accessories.', rating: 4.7, reviews: 2638, lat: 40.509996, lng: -111.856238 },
  { name: 'Camping World - Draper', address: '13153 Minuteman Dr, Draper, UT 84020, USA', phone: '+1 888-533-8913', website: 'https://rv.campingworld.com/dealer/draper-utah', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJfZ8a3DqHUocR3aY7FVVsf2c', description: 'Store for RVs, camping equipment & other outdoor gear, plus accessories & repair services.', rating: 4.5, reviews: 4497, lat: 40.540889, lng: -111.86538 },
  { name: 'Kenworth Sales', address: '2125 Constitution Blvd, West Valley City, UT 84119, USA', phone: '+1 877-845-7933', website: 'http://www.kenworthsalesco.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJb8NcWFHzUocRaex35wmFPh4', description: '', rating: 4.1, reviews: 624, lat: 40.674567, lng: -112.008389 },
  { name: 'Larry H. Miller Chevrolet Murray', address: '5500 S State St, Murray, UT 84107, USA', phone: '+1 801-264-3000', website: 'https://www.larryhmillerchevrolet.com/?utm_source=google&utm_medium=organic&utm_campaign=GMB', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJNwLH5o6JUocR4AHiiHSlKsM', description: '', rating: 4.4, reviews: 4639, lat: 40.684026, lng: -111.89407 },
  { name: 'Riverton Chevrolet', address: '11100 S Jordan Gateway, South Jordan, UT 84095, USA', phone: '+1 801-981-4529', website: 'http://www.rivertonchevy.com/?utm_medium=organic&utm_source=GMBlisting&utm_campaign=chevroletsales', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJg3qWBbeHUocRcM5_UZbZqCg', description: '', rating: 4.4, reviews: 3071, lat: 40.555641, lng: -111.923078 },
  { name: 'O\'Reilly Auto Parts', address: '4401 S State St, Murray, UT 84107, USA', phone: '+1 801-281-5515', website: 'https://locations.oreillyauto.com/en-us/ut/murray/autoparts-2856.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJgWKcmDiKUocRQLR9IF4i6pQ', description: '', rating: 4.0, reviews: 810, lat: 40.649247, lng: -111.877194 },
  { name: 'Discount Tire', address: '2269 S State St, Salt Lake City, UT 84115, USA', phone: '+1 801-487-1797', website: 'https://www.discounttire.com/store/ut/salt-lake-city/s/1256', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJOxCHPsSKUocR5vD24DE9gFw', description: '', rating: 4.2, reviews: 1263, lat: 40.766383, lng: -111.908798 },
  { name: 'State Trailer RV & Outdoor Supply', address: '3600 S Redwood Rd, Salt Lake City, UT 84119, USA', phone: '+1 801-978-0400', website: 'https://statetrailer.com/SaltLakeStore.php', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJexdBFHCLUocRWFVPYL-nrTY', description: '', rating: 4.4, reviews: 1498, lat: 40.748412, lng: -111.898341 },
  { name: 'Mercedes-Benz of Draper', address: '11548 S Lone Peak Pkwy, Draper, UT 84020, USA', phone: '+1 801-222-4400', website: 'https://www.mbdraper.com/?utm_source=google&utm_medium=organic&utm_campaign=google_my_business', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3TKifqmHUocRuorbsnQqUXM', description: '', rating: 4.7, reviews: 3291, lat: 40.542539, lng: -111.858364 },
  { name: 'AutoZone Auto Parts', address: '1199 E 3300 S, Salt Lake City, UT 84106, USA', phone: '+1 801-467-1501', website: 'https://www.autozone.com/locations/ut/salt-lake-city/1199-e-3300-s.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:3762', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3TIShn-KUocRPlVwVFYiIg8', description: '', rating: 4.1, reviews: 780, lat: 40.744202, lng: -111.880139 },
  { name: 'Harley-Davidson of Salt Lake City', address: '2928 S State St, Salt Lake City, UT 84115, USA', phone: '+1 801-487-4647', website: 'http://www.utahharley.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJH1fRWO6KUocR3c8gEB-auC4', description: 'Legendary brand of American motorcycles, plus apparel & more at some branches.', rating: 4.6, reviews: 1245, lat: 40.756476, lng: -111.892766 },
  { name: 'General RV Center', address: '14295 Minuteman Dr, Draper, UT 84020, USA', phone: '+1 801-890-3818', website: 'https://www.generalrv.com/rv-dealer/salt-lake-city-utah', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJBUNxFNuAUocRFBcQ960ef9g', description: '', rating: 4.2, reviews: 2176, lat: 40.538465, lng: -111.846872 },
  { name: 'Automotiveheroes', address: 'Waterview Dr, Saratoga Springs, UT 84045, USA', phone: '+1 801-949-7484', website: 'http://www.automotiveheroes.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ3zdFkqd5TYcRrziUSKk6p_0', description: '', rating: null, reviews: 0, lat: 40.358583, lng: -111.905419 },
  { name: 'Rocky Mountain ATV/MC', address: '1551 American Way, Payson, UT 84651, USA', phone: '+1 800-336-5437', website: 'http://www.rockymountainatvmc.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJwdJBwSakTYcRFrwrMjK0wjQ', description: '', rating: 4.8, reviews: 9154, lat: 40.044456, lng: -111.723895 },
  { name: 'Parris RV Payson', address: '425 E 920 N, Payson, UT 84651, USA', phone: '+1 801-658-0852', website: 'http://www.parrisrv.com/?utm_source=google&utm_medium=organic+&utm_campaign=google-business-profile', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJZ9U5FpKlTYcR1dTzi12t-hY', description: '', rating: 4.1, reviews: 425, lat: 40.056895, lng: -111.720111 },
  { name: 'AutoZone Auto Parts', address: '1292 Turf Farm Rd, Payson, UT 84651, USA', phone: '+1 801-465-4023', website: 'https://www.autozone.com/locations/ut/payson/1292-w-turf-farm-way.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:3764', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJSSHzTS-kTYcRemNweF-CjTU', description: '', rating: 4.4, reviews: 328, lat: 40.035097, lng: -111.741088 },
  { name: 'Ron Gordon\'s Tire & Service', address: '318 E 100 N, Payson, UT 84651, USA', phone: '+1 801-405-1233', website: 'https://www.gordonstirepros.com/locations/payson-ut?store_number=3406&utm_source=organic&utm_medium=gbp&utm_campaign=3406', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJf8c090KkTYcR_hmWPaQqpTk', description: '', rating: 4.8, reviews: 1211, lat: 40.042685, lng: -111.7439 },
  { name: 'AutoZone Auto Parts', address: '50 W Main St, Santaquin, UT 84655, USA', phone: '+1 385-422-9110', website: 'https://www.autozone.com/locations/ut/santaquin/50-w-main-st.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:6112', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJH0O0RACpTYcReA0NqSJ6iYQ', description: '', rating: 4.1, reviews: 58, lat: 39.983769, lng: -111.777169 },
  { name: 'O\'Reilly Auto Parts', address: '25 E 500 N, Payson, UT 84651, USA', phone: '+1 801-465-8515', website: 'https://locations.oreillyauto.com/en-us/ut/payson/autoparts-3234.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJs1-9BmykTYcRvUXJu5jNCGc', description: '', rating: 4.4, reviews: 255, lat: 40.037467, lng: -111.734028 },
  { name: 'Big O Tires', address: '921 Turf Farm Rd, Payson, UT 84651, USA', phone: '+1 801-658-0171', website: 'https://www.bigotires.com/location/ut/payson/921-s-turf-farm-rd-84651/044249?utm_source=google&utm_medium=maps&utm_campaign=google+maps&y_source=1_NTA0MjY0ODAtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJz6TcnGylTYcR-e9Ekv82DXA', description: '', rating: 4.8, reviews: 927, lat: 40.032722, lng: -111.719785 },
  { name: 'Jiffy Lube Oil Change & Multicare', address: '1094 W 800 S, Payson, UT 84651, USA', phone: '+1 801-658-5539', website: 'https://www.jiffylube.com/locations/ut/payson/3731', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJuQyr7y-kTYcR6wQXkrPyCrQ', description: '', rating: 4.3, reviews: 777, lat: 40.046232, lng: -111.742613 },
  { name: 'Big O Tires', address: '55 S Highland Dr, Santaquin, UT 84655, USA', phone: '+1 801-609-9427', website: 'https://www.bigotires.com/location/ut/santaquin/55-s-highland-dr-84655/044247?utm_source=google&utm_medium=maps&utm_campaign=google+maps&y_source=1_MTM4NjM1NTItNzE1LWxvY2F0aW9uLndlYnNpdGU%3D', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ33i7dbypTYcRxtYg-imiP2U', description: '', rating: 4.8, reviews: 1374, lat: 39.990377, lng: -111.777733 },
  { name: 'Burt Brothers Tire & Service', address: '1146 W 800 S, Payson, UT 84651, USA', phone: '+1 385-438-7194', website: 'https://www.burtbrothers.com/locations/1146-w-800-s-payson-ut-84651', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ46gkfC-kTYcRfcOzInSfP4U', description: '', rating: 4.5, reviews: 1117, lat: 40.059069, lng: -111.725778 },
  { name: 'O\'Reilly Auto Parts', address: '407 E 870 N, Salem, UT 84653, USA', phone: '+1 385-200-3025', website: 'https://locations.oreillyauto.com/en-us/ut/salem/autoparts-6257.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJew4cyJe7TYcRuttbzP8Biks', description: '', rating: 4.6, reviews: 44, lat: 40.037938, lng: -111.659902 },
  { name: 'Advance Auto Parts', address: '1062 W 800 S, Payson, UT 84651, USA', phone: '+1 801-405-7862', website: 'https://stores.advanceautoparts.com/ut/payson/1062-w-800-s?utm_medium=local&utm_source=yext-gmb&utm_content=gmb-2016-12-29&utm_campaign=aap', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJpUKMVUakTYcRoQWxFJUt1Uc', description: 'Chain stocking a wide variety of automotive parts & accessories such as batteries & oil filters.', rating: 4.3, reviews: 78, lat: 40.060529, lng: -111.722231 },
  { name: 'NAPA Auto Parts - Spanish Fork Auto Supply', address: '855 S Main St, Spanish Fork, UT 84660, USA', phone: '+1 801-798-8668', website: 'https://www.napaonline.com/en/UT/Spanish-Fork/store/25159?cid=pl_jobber_google_dac_25159_ao', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJo7GI67e8TYcR10vSfCW8Y7E', description: '', rating: 4.4, reviews: 107, lat: 40.121927, lng: -111.642973 },
  { name: 'NAPA Auto Parts - Payson Auto Supply', address: '190 E 100 N, Payson, UT 84651, USA', phone: '+1 801-465-9268', website: 'https://www.napaonline.com/en/UT/Payson/store/23661?cid=pl_jobber_google_dac_23661_ao', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJoXecQ0KkTYcRBl-zDupJ8HM', description: '', rating: 4.7, reviews: 147, lat: 40.033777, lng: -111.725197 },
  { name: 'AutoWorks Car Care', address: '484 E 100 N, Payson, UT 84651, USA', phone: '+1 801-465-9096', website: 'https://autoworkscarcare.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJZ0PQ1EKkTYcRPDAcxMxFntc', description: '', rating: 4.8, reviews: 485, lat: 40.043374, lng: -111.73639 },
  { name: 'Skiba Auto Repair', address: '635 S Main St, Spanish Fork, UT 84660, USA', phone: '+1 801-794-2286', website: 'http://www.skibaautorepair.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJd7czF8i8TYcRctRJgq5mkSI', description: '', rating: 4.7, reviews: 227, lat: 40.129961, lng: -111.637081 },
  { name: 'O\'Reilly Auto Parts', address: '479 W Main St, Santaquin, UT 84655, USA', phone: '+1 385-895-5150', website: 'https://locations.oreillyauto.com/en-us/ut/santaquin/autoparts-6768.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJtc1JcwCnTYcRbSLdCBsZIOo', description: '', rating: 4.5, reviews: 22, lat: 39.993402, lng: -111.796808 },
  { name: 'Les Schwab Tire Center', address: '98 N 500 E, Santaquin, UT 84655, USA', phone: '+1 385-895-1008', website: 'https://www.lesschwab.com/stores/ut/santaquin/98-n-500-e?utm_source=google&utm_medium=organic&utm_campaign=gmb-homepage', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJHyYfZ8apTYcRiAGm3Ufy4VA', description: '', rating: 4.8, reviews: 50, lat: 39.98745, lng: -111.77351 },
  { name: 'Walmart Auto Care Center', address: '1052 Turf Farm Rd, Payson, UT 84651, USA', phone: '+1 801-465-8893', website: 'https://www.walmart.com/store/5167-payson-ut/auto-care-center/?veh=seo_loc', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJkytbJCmkTYcRjiuO6YpV0nI', description: '', rating: 3.9, reviews: 173, lat: 40.037647, lng: -111.748112 },
  { name: 'Rayloc & Traction - A Division of Genuine Parts Company', address: '700 N 500 E, Payson, UT 84651, USA', phone: '+1 801-465-4841', website: 'https://www.napaonline.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJfYwBnmWkTYcRcuHQkmC6iwE', description: '', rating: 3.6, reviews: 24, lat: 40.040221, lng: -111.723219 },
  { name: 'AutoZone Auto Parts', address: '723 N 800 E, Spanish Fork, UT 84660, USA', phone: '+1 801-798-1053', website: 'https://www.autozone.com/locations/ut/spanish-fork/723-n-800-e.html?cmpid=LOC:US:EN:AD:NL:1000000:GEN:886', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJTZ2Ci-C8TYcRUSuKNnSXaJA', description: '', rating: 4.3, reviews: 537, lat: 40.104139, lng: -111.670915 },
  { name: 'Discount Tire', address: '975 N 500 E, Spanish Fork, UT 84660, USA', phone: '+1 801-504-9623', website: 'https://www.discounttire.com/store/ut/spanish-fork/s/2138', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJqX689S69TYcRZli4zS9cE9w', description: '', rating: 4.4, reviews: 539, lat: 40.12458, lng: -111.639892 },
  { name: 'Jiffy Lube Oil Change & Multicare', address: '901 Expressway Ln, Spanish Fork, UT 84660, USA', phone: '+1 801-798-3993', website: 'https://www.jiffylube.com/locations/ut/spanish-fork/3434', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJt6J-teG8TYcRGHUugPHZY-Q', description: '', rating: 4.3, reviews: 1067, lat: 40.099751, lng: -111.65044 },
  { name: 'Rocky Mountain Auto & Diesel Repair', address: '721 N 800 E, Spanish Fork, UT 84660, USA', phone: '+1 801-980-2078', website: 'https://rockymountaind.com/spanish-fork/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJa0eV8uC8TYcRedLBzwIsibs', description: '', rating: 4.5, reviews: 159, lat: 40.115176, lng: -111.666154 },
  { name: 'Walmart Auto Care Center', address: '1206 N Cyn Crk Pkwy, Spanish Fork, UT 84660, USA', phone: '+1 801-804-3502', website: 'https://www.walmart.com/store/4068-spanish-fork-ut/auto-care-center/?veh=seo_loc', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJdZ9_SR69TYcROshnE-LFkWc', description: '', rating: 3.2, reviews: 121, lat: 40.109309, lng: -111.671527 },
  { name: 'Dr. Tires', address: '841 S Main St, Spanish Fork, UT 84660, USA', phone: '+1 385-230-0618', website: '', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJp5BlbCi9TYcRAZfjPE9EaWI', description: '', rating: 4.9, reviews: 51, lat: 40.115449, lng: -111.650002 },
  { name: 'Service Towing Utah Llc.', address: '890 E 100 N, Spanish Fork, UT 84660, USA', phone: '+1 801-900-3869', website: 'http://servicetowingutah.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJibLw9ei8TYcRTz1wukQpi8k', description: '', rating: 4.7, reviews: 40, lat: 40.115586, lng: -111.660974 },
  { name: 'Utah Mobile Tire', address: '490 N 600 E, Spanish Fork, UT 84660, USA', phone: '+1 801-382-9886', website: 'https://www.utahmobiletire.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJNV8Kpmy9TYcR0l9ayCGje0c', description: '', rating: 5.0, reviews: 70, lat: 40.098503, lng: -111.647682 },
  { name: 'Rave Off Road', address: '1128 E 1130 N, Spanish Fork, UT 84660, USA', phone: '+1 385-505-8727', website: 'https://raveoffroad.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJCToKwFK9TYcRjpWjeEVL0YA', description: '', rating: 4.6, reviews: 42, lat: 40.100344, lng: -111.649344 },
  { name: 'Sorensen\'s Cycle Service', address: '1861 W Alvey Dr, Mapleton, UT 84664, USA', phone: '+1 801-420-5623', website: '', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJAwfJZ0e9TYcRGvK4bhuH5tg', description: '', rating: 4.4, reviews: 22, lat: 40.155706, lng: -111.573863 },
  { name: 'MX PowerPlay', address: '575 UT-198, Salem, UT 84653, USA', phone: '+1 801-669-0439', website: 'http://mxpowerplay.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJacejokGkTYcRVVtCXcWrz0U', description: '', rating: 3.1, reviews: 116, lat: 40.049008, lng: -111.659081 },
  { name: 'Velvet Sky Auto Care', address: '3064 Somerset Village Way, Spanish Fork, UT 84660, USA', phone: '+1 385-505-3042', website: 'https://vsautocare.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJS8NyHgy9TYcRYZ_B-8DwR-s', description: '', rating: 5.0, reviews: 6, lat: 40.132855, lng: -111.664608 },
  { name: 'Mountain Valley RV Resort', address: '2120 US-40, Heber City, UT 84032, USA', phone: '+1 435-657-6100', website: 'http://mountainvalleyrv.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJkYMWxMr1TYcRz9cj2P_Hsx4', description: '', rating: 4.7, reviews: 919, lat: 40.520442, lng: -111.423132 },
  { name: 'Rocky Road Outfitters', address: '1920 S Wendell Ln, Heber City, UT 84032, USA', phone: '+1 435-654-1149', website: 'http://www.rocky-road.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJkyYaWK71TYcRWwaWaq_xv5c', description: '', rating: 3.9, reviews: 324, lat: 40.51325, lng: -111.406963 },
  { name: 'Stone Mobile Tires', address: '80 450 S, Midway, UT 84049, USA', phone: '+1 801-400-4777', website: 'https://stonemobiletires.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJU7indgD1TYcRvglENEoU_JE', description: '', rating: 5.0, reviews: 24, lat: 40.524253, lng: -111.482729 },
  { name: 'Brent\'s Custom Upholstery', address: '1514 S Daniels Rd, Heber City, UT 84032, USA', phone: '+1 435-654-1708', website: 'http://www.brentsupholstery.com/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJX6jF7uX2TYcR7bwonxgpHIM', description: '', rating: 4.7, reviews: 13, lat: 40.520235, lng: -111.409013 },
  { name: 'Auto Value', address: '824 S Auto Mall Dr, American Fork, UT 84003, USA', phone: '+1 801-224-2828', website: 'https://locations.autovalue.com/ut/orem/2732154/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ85iZ9cyaTYcRaOG--wm5rfE', description: '', rating: 4.6, reviews: 23, lat: 40.373872, lng: -111.793407 },
  { name: 'RHINO LININGS OF THE WASATCH BACK', address: '901 S Main St, Heber City, UT 84032, USA', phone: '+1 435-654-5120', website: 'https://rhinolinings.com/find-applicator/ut/hebercity/rhino_truckbed_liners_heber-city_ut_84032_201066.html', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ-R36HL31TYcR37qSAw5KKEI', description: 'Chain retailer providing a variety of spray-on protective coatings for truck beds & industrial uses.', rating: 4.7, reviews: 6, lat: 40.52215, lng: -111.410263 },
  { name: 'CARQUEST AUTO PARTS #6914', address: '26 N Main St, Heber City, UT 84032, USA', phone: '+1 435-654-1520', website: '', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJgbV8q4L1TYcRBO2DvTuj6F0', description: '', rating: null, reviews: 0, lat: 40.493682, lng: -111.415581 },
  { name: 'Labrum Ford, Inc. Parts', address: '901 S Main St, Heber City, UT 84032, USA', phone: '+1 435-654-4910', website: 'https://www.labrumford.net/', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJL0xdqPn1TYcRKkGrWgs5W7k', description: '', rating: null, reviews: 0, lat: 40.511854, lng: -111.409533 },
  { name: 'Doug Smith Subaru', address: '501 W Main St, American Fork, UT 84003, USA', phone: '+1 801-847-1048', website: 'https://www.dougsmithsubaru.com/?utm_source=google&utm_medium=organic&utm_campaign=google-business-profile', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJo35vhZ6BTYcR0SDPE6Lpyb4', description: '', rating: 4.8, reviews: 3877, lat: 40.367204, lng: -111.788549 },
  { name: 'Discount Tire', address: '661 NW State St, American Fork, UT 84003, USA', phone: '+1 801-763-8604', website: 'https://www.discounttire.com/store/ut/american-fork/s/1626', mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJpf1ciKOBTYcRmpmiBY0yPJs', description: '', rating: 4.3, reviews: 807, lat: 40.380798, lng: -111.787437 },
];

export const PROSPECTS = [
  { name: 'Silver Lake Business Park', type: 'Commercial', city: 'Lehi', turf: '6.2 ac', value: '$18,400', sel: true },
  { name: 'Traverse Ridge HOA', type: 'HOA', city: 'Draper', turf: '4.8 ac', value: '$14,900', sel: true },
  { name: 'Thanksgiving Point Offices', type: 'Commercial', city: 'Lehi', turf: '3.9 ac', value: '$11,600', sel: false },
  { name: 'Meadow Crossing Apartments', type: 'Multifamily', city: 'American Fork', turf: '3.1 ac', value: '$9,750', sel: true },
  { name: 'Pointe West Medical', type: 'Commercial', city: 'Saratoga Springs', turf: '2.4 ac', value: '$7,300', sel: false },
  { name: 'Willow Bend HOA', type: 'HOA', city: 'Highland', turf: '2.2 ac', value: '$6,900', sel: false },
  { name: 'Canyon Gate Corporate Center', type: 'Commercial', city: 'Alpine', turf: '2.1 ac', value: '$6,400', sel: false },
  { name: 'Northshore Townhomes', type: 'Multifamily', city: 'Vineyard', turf: '2.0 ac', value: '$5,850', sel: false },
];

export const CONTACTS = [
  { name: 'Dana Whitmore', title: 'Director of Facilities', email: 'd.whitmore@silverlakebp.com', phone: '(801) 555-0142', revealed: true },
  { name: 'Marcus Field', title: 'Property Manager', email: 'm.field@silverlakebp.com', phone: '(801) 555-0187', revealed: false },
  { name: 'Priya Raman', title: 'VP Operations', email: 'p.raman@silverlakebp.com', phone: '(801) 555-0119', revealed: false },
  { name: 'Owen Castillo', title: 'Grounds Supervisor', email: 'o.castillo@silverlakebp.com', phone: '(801) 555-0166', revealed: false },
  { name: 'Beth Nakagawa', title: 'Regional Controller', email: 'b.nakagawa@silverlakebp.com', phone: '(801) 555-0173', revealed: false },
  { name: 'Trent Alvarez', title: 'Site Manager', email: 't.alvarez@silverlakebp.com', phone: '(801) 555-0128', revealed: false },
];

export const COMPANY_PROFILE = [
  { k: 'Industry', v: 'Property mgmt' },
  { k: 'Employees', v: '120-250' },
  { k: 'Revenue', v: '$28M est.' },
  { k: 'Locations', v: '4 in UT' },
  { k: 'Turf area', v: '6.2 acres' },
  { k: 'Website', v: 'silverlakebp.com' },
];

export const FILTER_OPTIONS = {
  Status: ['Active', 'Canceled', 'Paused', 'Lead'],
  Services: ['Mowing', 'Fertilization', 'Irrigation', 'Snow removal'],
  Rep: ['Robert Clark', 'Jess Nolan', 'Ty Brennan'],
};

export const COUNTS = {
  'Status:Active': 1642, 'Status:Canceled': 710, 'Status:Paused': 288, 'Status:Lead': 133,
  'Services:Mowing': 1210, 'Services:Fertilization': 604, 'Services:Irrigation': 431, 'Services:Snow removal': 219,
  'Rep:Robert Clark': 512, 'Rep:Jess Nolan': 476, 'Rep:Ty Brennan': 398,
};

export const TOTAL_ACCOUNTS = 2773;

export const MODELS = ['Claude Opus 5', 'Claude Sonnet 5', 'GPT-5', 'GPT-5 mini'];

// Maps a MODELS display name to the real Claude API model ID for /api/chat.
// Entries not in this map (GPT-5, GPT-5 mini) have no connected key, so Chat
// keeps using the canned replies below for them.
export const CLAUDE_MODEL_IDS = {
  'Claude Opus 5': 'claude-opus-5',
  'Claude Sonnet 5': 'claude-sonnet-5',
};

export const SUGGESTIONS = [
  { label: 'Summarize churn risk', q: 'Summarize churn risk across canceled accounts' },
  { label: "Plan Tuesday's route", q: "Plan Tuesday's route around Provo" },
  { label: 'Find lookalikes', q: 'Find lookalikes of my best accounts' },
];

export const RECENT_CHATS = [
  'Canceled mowing in Utah County',
  'Best route for Tuesday - Ogden',
  'Accounts with no service since May',
];

// Canned assistant replies. Replace pickReply() with a real /api/chat call later.
const REPLIES = [
  {
    match: /cancel|churn|risk|lost/i,
    text: '14 canceled mowing accounts sit within a 15-minute drive of your Provo route. Nine canceled in the last 90 days - that group is usually the most winnable.',
    rows: [
      { a: 'Wasatch Ridge HOA', b: 'Orem', c: 'Canceled', d: '$4,800' },
      { a: 'Cedar Hollow Apts', b: 'Provo', c: 'Canceled', d: '$3,150' },
      { a: 'Timp View Dental', b: 'Pleasant Grove', c: 'Canceled', d: '$1,240' },
    ],
    pin: '14 canceled accounts near Provo',
    count: 14,
  },
  {
    match: /route|tuesday|drive|plan/i,
    text: 'Here is a 6-stop loop for Tuesday. Total drive time is 1h 48m, down 34 minutes from routing them in CRM order.',
    rows: [
      { a: 'Traverse Ridge HOA', b: 'Draper', c: 'Active', d: '$14,900' },
      { a: 'Silver Lake Business Park', b: 'Lehi', c: 'Lead', d: '$18,400' },
      { a: 'Meadow Crossing Apts', b: 'American Fork', c: 'Active', d: '$9,750' },
    ],
    pin: 'Tuesday route - 6 stops',
    count: 6,
  },
  {
    match: /lookalike|similar|like/i,
    text: 'Your best-performing segment is 3-7 acre commercial parks in south Salt Lake County. 23 properties match that shape and are not in the CRM yet.',
    rows: [
      { a: 'Canyon Gate Corporate Center', b: 'Alpine', c: 'Prospect', d: '$6,400' },
      { a: 'Pointe West Medical', b: 'Saratoga Springs', c: 'Prospect', d: '$7,300' },
      { a: 'Willow Bend HOA', b: 'Highland', c: 'Prospect', d: '$6,900' },
    ],
    pin: '23 lookalike prospects',
    count: 23,
  },
];

const DEFAULT_REPLY = {
  text: 'Across the 710 accounts currently shown, average contract value is $6,180 and 41% carry more than one service line. The Ogden cluster is your weakest - 22% below the portfolio average.',
  rows: [
    { a: 'Ogden cluster', b: 'Ogden', c: '84 accts', d: '$4,820' },
    { a: 'Salt Lake core', b: 'Salt Lake City', c: '312 accts', d: '$6,940' },
    { a: 'Utah County', b: 'Provo', c: '198 accts', d: '$6,110' },
  ],
  pin: '710 accounts - portfolio view',
  count: 710,
};

export function pickReply(text) {
  return REPLIES.find((r) => r.match.test(text)) || DEFAULT_REPLY;
}
