/**
 * Swasthya Setu (स्वास्थ्य सेतु) - Indian Administrative Locations & Hierarchy Engine
 * Provides structured States, Districts, Mandals/Tehsils, and Villages with cascading selection.
 */

(function(global) {
  'use strict';

  const ADMINISTRATIVE_DATA = {
    "Andhra Pradesh": {
      "NTR District": {
        "Ibrahimpatnam": ["Kondapalli", "Ibrahimpatnam", "Guntupalli", "Kotikalapudi", "Damuluru", "Trilochanapuram", "Tummalapalem", "Zeedimogu", "Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5", "Ward 6"],
        "Vijayawada Urban": ["Governorpet", "Suryaraopet", "Gandhinagar", "Benz Circle", "Satyanarayanapuram", "Bhavanipuram", "Patamata", "Moghalrajpuram"],
        "Vijayawada Rural": ["Nunna", "Enikepadu", "Prasadampadu", "Gollapudi", "Jakkampudi", "Ambapuram", "Kandrika", "Payakapuram"],
        "Mylavaram": ["Mylavaram", "Chandrala", "Pulluru", "Velvadam", "Sabjapadu", "Ponnavaram", "Keerthirayanigudem"],
        "G. Konduru": ["G. Konduru", "Chegireddypadu", "Kuntamukkala", "Atukur", "Chevuru", "Koduru", "Munagapadu"],
        "Tiruvuru": ["Tiruvuru", "Arugolanu", "Kokilampadu", "Rolupadi", "Vavilala", "Lakshmipuram", "Maddulaparva"],
        "Jaggayyapeta": ["Jaggayyapeta", "Chillakallu", "Torraguntapalem", "Muktyala", "Vedadri", "Ravirala"]
      },
      "Krishna": {
        "Machilipatnam": ["Machilipatnam Town", "Chilakalapudi", "Bandar Kota", "Potlapadu", "Gokavaram", "Tallapalem"],
        "Gudivada": ["Gudivada Town", "Valivartipadu", "Billapadu", "Chilakamarri", "Mandapadu", "Bommuluru"],
        "Pamarru": ["Pamarru", "Kurumaddali", "Zillellamudi", "Komaravolu", "Pasumarru", "Addada"]
      },
      "Guntur": {
        "Guntur Urban": ["Arundelpet", "Brodipet", "Kothapet", "Pattabhipuram", "Nallapadu", "Old Guntur"],
        "Mangalagiri": ["Mangalagiri Town", "Navuluru", "Atmakuru", "Chinna Kakani", "Yerrabalem", "Nowluru"],
        "Tenali": ["Tenali Town", "Angalakuduru", "Burripalem", "Pinapadu", "Chenchupet", "Chinaravuru"]
      },
      "Visakhapatnam": {
        "Visakhapatnam Urban": ["MVP Colony", "Gajuwaka", "Madhurawada", "Dwaraka Nagar", "Siripuram", "Pendurthi"],
        "Anakapalle": ["Anakapalle Town", "Kasimkota", "Munagapaka", "Sankaram", "Thummapala"],
        "Bheemunipatnam": ["Bheemili Town", "Tagarapuvalasa", "Nidigattu", "Kothavalasa", "Nainampudi"]
      }
    },
    "Telangana": {
      "Hyderabad": {
        "Secunderabad": ["Secunderabad", "Marredpally", "Begumpet", "Trimulgherry", "Tarnaka", "Bowenpally"],
        "Khairatabad": ["Khairatabad", "Somajiguda", "Banjara Hills", "Jubilee Hills", "Panjagutta", "Ameerpet"],
        "Charminar": ["Charminar", "Faluknuma", "Chandrayangutta", "Bahadurpura", "Moghalpura", "Yakutpura"]
      },
      "Rangareddy": {
        "Serilingampally": ["Gachibowli", "Madhapur", "Kondapur", "Hitec City", "Hafeezpet", "Miyapur"],
        "Rajendranagar": ["Rajendranagar", "Attapur", "Bandlaguda Jagir", "Mailardevpally", "Shamshabad", "Gaganpahad"],
        "Ibrahimpatnam (TS)": ["Ibrahimpatnam", "Adibatla", "Bongloor", "Mangalpalle", "Kongara Kalan", "Pocharam"]
      },
      "Warangal": {
        "Warangal Urban": ["Hanamkonda", "Kazipet", "Warangal City", "Subedari", "Nayeemnagar"],
        "Narsampet": ["Narsampet", "Chennaraopet", "Duggondi", "Khanapur", "Nekkonda"]
      }
    },
    "Karnataka": {
      "Bengaluru Urban": {
        "Bengaluru North": ["Malleshwaram", "Hebbal", "Yelahanka", "Peenya", "Jalahalli", "Yeshwanthpur"],
        "Bengaluru South": ["Jayanagar", "JP Nagar", "BTM Layout", "Banashankari", "Basavanagudi", "Padmanabhanagar"],
        "Bengaluru East": ["Indiranagar", "Whitefield", "Marathahalli", "Kalyan Nagar", "KR Puram", "Bellandur"]
      },
      "Mysuru": {
        "Mysuru City": ["Gokulam", "Kuvempunagar", "Saraswathipuram", "Jayalakshmipuram", "Chamundipuram"],
        "Hunsur": ["Hunsur Town", "Bilikere", "Gavadagere", "Katte Malalavadi"]
      }
    },
    "Tamil Nadu": {
      "Chennai": {
        "Egmore": ["Egmore", "Chetpet", "Kilpauk", "Nungambakkam"],
        "Mylapore": ["Mylapore", "Alwarpet", "Mandaveli", "Santhome", "R.A. Puram"],
        "Guindy": ["Guindy", "Alandur", "Saidapet", "Ekkatuthangal"]
      },
      "Coimbatore": {
        "Coimbatore North": ["RS Puram", "Gandhipuram", "Saibaba Colony", "Ganapathy", "Koundampalayam"],
        "Coimbatore South": ["Ukkadam", "Singanallur", "Ramanathapuram", "Podanur", "Sundarapuram"]
      }
    },
    "Maharashtra": {
      "Mumbai City": {
        "Colaba": ["Colaba", "Cuffe Parade", "Fort", "Nariman Point", "Churchgate"],
        "Byculla": ["Byculla", "Mazgaon", "Chinchpokli", "Parel", "Lalbaug"]
      },
      "Pune": {
        "Pune City": ["Shivajinagar", "Kothrud", "Deccan Gymkhana", "Camp", "Kalyani Nagar", "Viman Nagar"],
        "Haveli": ["Hadapsar", "Kondhwa", "Wagholi", "Manjari", "Khopoli"]
      }
    },
    "Delhi (NCT)": {
      "Central Delhi": {
        "Daryaganj": ["Daryaganj", "Chandni Chowk", "Kashmere Gate", "Ajmeri Gate"],
        "Civil Lines": ["Civil Lines", "Tis Hazari", "Timarpur", "Mukherjee Nagar"]
      },
      "South Delhi": {
        "Hauz Khas": ["Hauz Khas", "Green Park", "SDA", "Safdarjung Enclave"],
        "Saket": ["Saket", "Malviya Nagar", "Pushp Vihar", "Sainik Farm"]
      }
    },
    "Uttar Pradesh": {
      "Lucknow": {
        "Lucknow City": ["Hazratganj", "Alambagh", "Gomti Nagar", "Indira Nagar", "Aliganj", "Chowk"],
        "Bakshi Ka Talab": ["BKT Town", "Itaunja", "Kathwara", "Rampur Bhawanipur"]
      },
      "Varanasi": {
        "Varanasi City": ["Cantonment", "Sigra", "Godowlia", "Assi", "Lanka", "Bhelupur"],
        "Pindra": ["Pindra Town", "Phulpur", "Mangari", "Babupur"]
      }
    },
    "Bihar": {
      "Patna": {
        "Patna Sadar": ["Kankarbagh", "Boring Road", "Rajendra Nagar", "Bailey Road", "Patliputra"],
        "Danapur": ["Danapur Cantt", "Khagaul", "Saguna More", "Shahpur"]
      }
    },
    "West Bengal": {
      "Kolkata": {
        "Kolkata Central": ["Park Street", "Esplanade", "Bhowanipore", "Sealdah", "College Street"],
        "Kolkata South": ["Ballygunge", "Gariahat", "Alipore", "Tollygunge", "Jadavpur"]
      }
    },
    "Rajasthan": {
      "Jaipur": {
        "Jaipur City": ["C-Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Raja Park"],
        "Sanganer": ["Sanganer Town", "Sitapura", "Pratap Nagar", "Jagatpura"]
      }
    },
    "Gujarat": {
      "Ahmedabad": {
        "Ahmedabad City": ["Navrangpura", "Satellite", "Vastrapur", "Bodakdev", "Maninagar"],
        "Daskroi": ["Ghatlodia", "Chandkheda", "Bopal", "Sanand Road"]
      }
    },
    "Kerala": {
      "Thiruvananthapuram": {
        "Thiruvananthapuram": ["Pattom", "Kowdiar", "Vellayambalam", "Palayam", "Sasthamangalam", "Kazhakkoottam"]
      },
      "Ernakulam": {
        "Kochi": ["Kadavanthra", "Panampilly Nagar", "Edappally", "Kaloor", "Marine Drive", "Fort Kochi"]
      }
    }
  };

  const ALL_INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (NCT)", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const LocationService = {
    getStates() {
      return [...ALL_INDIAN_STATES];
    },

    getDistricts(state) {
      if (!state) return [];
      if (ADMINISTRATIVE_DATA[state]) {
        return Object.keys(ADMINISTRATIVE_DATA[state]);
      }
      return [
        state + " District HQ",
        "Central " + state,
        "North " + state,
        "South " + state,
        "East " + state,
        "West " + state
      ];
    },

    getMandals(state, district) {
      if (!state || !district) return [];
      if (ADMINISTRATIVE_DATA[state] && ADMINISTRATIVE_DATA[state][district]) {
        return Object.keys(ADMINISTRATIVE_DATA[state][district]);
      }
      return [
        district + " Sadar / Taluk 1",
        district + " Rural / Mandal 2",
        district + " Central Tehsil"
      ];
    },

    getVillages(state, district, mandal) {
      if (!state || !district || !mandal) return [];
      if (ADMINISTRATIVE_DATA[state] && ADMINISTRATIVE_DATA[state][district] && ADMINISTRATIVE_DATA[state][district][mandal]) {
        return [...ADMINISTRATIVE_DATA[state][district][mandal]];
      }
      return [
        mandal + " Gramam / Ward 1",
        mandal + " Sector Ward 2",
        mandal + " Main Village",
        mandal + " Sub-Centre Ward 4"
      ];
    },

    validatePincode(pincode) {
      if (!pincode) return false;
      const clean = String(pincode).trim();
      return /^[1-9][0-9]{5}$/.test(clean);
    },

    formatAddressString(addr) {
      if (!addr) return '';
      const parts = [];
      if (addr.address_line_1) parts.push(addr.address_line_1);
      if (addr.address_line_2) parts.push(addr.address_line_2);
      if (addr.landmark) parts.push('Near ' + addr.landmark);
      if (addr.village_city) parts.push(addr.village_city);
      if (addr.mandal) parts.push(addr.mandal);
      if (addr.district) parts.push(addr.district);
      if (addr.state) {
        if (addr.pincode) {
          parts.push(addr.state + ' - ' + addr.pincode);
        } else {
          parts.push(addr.state);
        }
      }
      if (addr.country && addr.country !== 'India') parts.push(addr.country);
      return parts.join(', ');
    }
  };

  global.locationService = LocationService;
})(typeof window !== 'undefined' ? window : global);
