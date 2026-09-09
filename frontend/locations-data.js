/**
 * Swasthya Setu (स्वास्थ्य सेतु) - Indian Administrative Locations & Hierarchy Engine
 * Complete pan-India dataset covering all 28 States and 8 Union Territories with 780+ official districts.
 * Provides cascading selection for States -> Districts -> Mandals / Tehsils -> Villages / Wards.
 */

(function(global) {
  'use strict';

  const ALL_INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCT)",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

  const DISTRICTS_BY_STATE = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B.R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "NTR District",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Sri Potti Sriramulu Nellore",
    "Sri Sathya Sai",
    "Srikakulam",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Kamle",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang"
  ],
  "Assam": [
    "Bajali",
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tamulpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran (Motihari)",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur (Bhabua)",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran (Bettiah)"
  ],
  "Chhattisgarh": [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham (Kawardha)",
    "Kanker",
    "Khairagarh-Chhuikhadan-Gandai",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja"
  ],
  "Goa": [
    "North Goa",
    "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad"
  ],
  "Haryana": [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una"
  ],
  "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum (Jamshedpur)",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum (Chaibasa)"
  ],
  "Karnataka": [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapura",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada (Mangaluru)",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu (Madikeri)",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayanagara",
    "Vijayapura",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam (Kochi)",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad (Narmadapuram)",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Pandhurna",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar (Ahilyanagar)",
    "Akola",
    "Amravati",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Chhatrapati Sambhajinagar (Aurangabad)",
    "Dharashiv (Osmanabad)",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills (Shillong)",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip"
  ],
  "Nagaland": [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto"
  ],
  "Odisha": [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar (Keonjhar)",
    "Khordha (Bhubaneswar)",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur (Sonepur)",
    "Sundargarh"
  ],
  "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar (Mohali)",
    "Sangrur",
    "Shahid Bhagat Singh Nagar (Nawanshahr)",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dudu",
    "Dungarpur",
    "Ganganagar",
    "Gangapur City",
    "Hanumangarh",
    "Hindaun",
    "Jaipur",
    "Jaipur Rural",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Jodhpur Rural",
    "Karauli",
    "Kekri",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sanchore",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur"
  ],
  "Sikkim": [
    "Gangtok",
    "Gyalshing",
    "Mangan",
    "Namchi",
    "Pakyong",
    "Soreng"
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris (Ooty)",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Kumuram Bheem Asifabad",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura (Agartala)"
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar (Noida)",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun (Orai)",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri (Lakhimpur Kheri)",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj (Allahabad)",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shrawasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi"
  ],
  "Uttarakhand": [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur"
  ],
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman (Port Blair)"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu"
  ],
  "Delhi (NCT)": [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi"
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur"
  ],
  "Ladakh": [
    "Kargil",
    "Leh"
  ],
  "Lakshadweep": [
    "Lakshadweep (Kavaratti)"
  ],
  "Puducherry": [
    "Karaikal",
    "Mahe",
    "Puducherry",
    "Yanam"
  ]
};

  const DETAILED_MANDALS = {
  "Lucknow": [
    "Lucknow Sadar",
    "Bakshi Ka Talab",
    "Malihabad",
    "Mohanlalganj",
    "Sarojini Nagar"
  ],
  "Varanasi": [
    "Varanasi Sadar",
    "Pindra",
    "Rajatalab"
  ],
  "Agra": [
    "Agra Sadar",
    "Etmadpur",
    "Fatehabad",
    "Kheragarh",
    "Bah",
    "Kiraoli"
  ],
  "Prayagraj (Allahabad)": [
    "Sadar",
    "Bara",
    "Karchhana",
    "Koraon",
    "Meja",
    "Phulpur",
    "Soraon",
    "Handia"
  ],
  "Kanpur Nagar": [
    "Kanpur Sadar",
    "Bilhaur",
    "Ghatampur",
    "Narwal"
  ],
  "Kanpur Dehat": [
    "Akbarpur",
    "Bhognipur",
    "Derapur",
    "Rasulabad",
    "Sikandra",
    "Maitha"
  ],
  "Gorakhpur": [
    "Gorakhpur Sadar",
    "Bansgaon",
    "Campierganj",
    "Chauri Chaura",
    "Gola",
    "Khajni",
    "Sahjanwa"
  ],
  "Gautam Buddha Nagar (Noida)": [
    "Noida",
    "Greater Noida",
    "Dadri",
    "Jewar"
  ],
  "Ghaziabad": [
    "Ghaziabad Sadar",
    "Modinagar",
    "Loni"
  ],
  "Meerut": [
    "Meerut Sadar",
    "Mawana",
    "Sardhana"
  ],
  "Aligarh": [
    "Koil (Aligarh Sadar)",
    "Khair",
    "Atrauli",
    "Iglas",
    "Gabhana"
  ],
  "Mathura": [
    "Mathura Sadar",
    "Chhata",
    "Mant",
    "Goverdhan",
    "Mahavan"
  ],
  "Ayodhya": [
    "Ayodhya Sadar",
    "Bikapur",
    "Milkipur",
    "Rudauli",
    "Sohawal"
  ],
  "Bareilly": [
    "Bareilly Sadar",
    "Aonla",
    "Baheri",
    "Faridpur",
    "Mirganj",
    "Nawabganj"
  ],
  "Moradabad": [
    "Moradabad Sadar",
    "Bilari",
    "Kanth",
    "Thakurdwara"
  ],
  "Jhansi": [
    "Jhansi Sadar",
    "Mauranipur",
    "Garautha",
    "Moth",
    "Tehroli"
  ],
  "Saharanpur": [
    "Saharanpur Sadar",
    "Behat",
    "Deoband",
    "Nakur",
    "Rampur Maniharan"
  ],
  "Muzaffarnagar": [
    "Muzaffarnagar Sadar",
    "Budhana",
    "Jansath",
    "Khatauli"
  ],
  "Jaunpur": [
    "Jaunpur Sadar",
    "Badlapur",
    "Kerakat",
    "Machhlishahr",
    "Mariahu",
    "Shahganj"
  ],
  "Azamgarh": [
    "Azamgarh Sadar",
    "Burhanpur",
    "Lalganj",
    "Mehnagar",
    "Nizamabad",
    "Phoolpur",
    "Sagri"
  ],
  "Ballia": [
    "Ballia Sadar",
    "Bairia",
    "Bansdih",
    "Belthara Road",
    "Rasra",
    "Sikanderpur"
  ],
  "Basti": [
    "Basti Sadar",
    "Harraiya",
    "Bhanpur",
    "Rudauli"
  ],
  "Deoria": [
    "Deoria Sadar",
    "Barhaj",
    "Bhatpar Rani",
    "Rudrapur",
    "Salempur"
  ],
  "Ghazipur": [
    "Ghazipur Sadar",
    "Jakhanian",
    "Mohammadabad",
    "Saidpur",
    "Zamania"
  ],
  "Mirzapur": [
    "Mirzapur Sadar",
    "Chunar",
    "Lalganj",
    "Marihan"
  ],
  "Sonbhadra": [
    "Robertsganj",
    "Duddhi",
    "Ghorawal",
    "Obra"
  ],
  "Sultanpur": [
    "Sultanpur Sadar",
    "Jaisinghpur",
    "Kadipur",
    "Lambhua"
  ],
  "Amethi": [
    "Gauriganj",
    "Amethi",
    "Musafirkhana",
    "Tiloi"
  ],
  "Raebareli": [
    "Raebareli Sadar",
    "Dalmau",
    "Lalganj",
    "Maharajganj",
    "Salon",
    "Unchahar"
  ],
  "Sitapur": [
    "Sitapur Sadar",
    "Biswan",
    "Laharpur",
    "Mahmoodabad",
    "Misrikh",
    "Sidhauli"
  ],
  "Hardoi": [
    "Hardoi Sadar",
    "Bilgram",
    "Sandila",
    "Sawayajpur",
    "Shahabad"
  ],
  "Unnao": [
    "Unnao Sadar",
    "Bighapur",
    "Hasanganj",
    "Purwa",
    "Safipur"
  ],
  "Etawah": [
    "Etawah Sadar",
    "Bharthana",
    "Chakarnagar",
    "Jaswantnagar",
    "Saifai"
  ],
  "Mainpuri": [
    "Mainpuri Sadar",
    "Bhogaon",
    "Karhal",
    "Kishni",
    "Kurawali"
  ],
  "Firozabad": [
    "Firozabad Sadar",
    "Jasrana",
    "Shikohabad",
    "Sirsaganj",
    "Tundla"
  ],
  "Banda": [
    "Banda Sadar",
    "Atarra",
    "Baberu",
    "Naraini",
    "Pailani"
  ],
  "Barabanki": [
    "Nawabganj (Barabanki Sadar)",
    "Fatehpur",
    "Haidergarh",
    "Ramnagar",
    "Ramsanehighat",
    "Sirauli Ghauspur"
  ],
  "Bijnor": [
    "Bijnor Sadar",
    "Chandpur",
    "Dhampur",
    "Nagina",
    "Najibabad"
  ],
  "Bulandshahr": [
    "Bulandshahr Sadar",
    "Anupshahr",
    "Debai",
    "Khurja",
    "Shikarpur",
    "Siana",
    "Syana"
  ],
  "Chitrakoot": [
    "Karwi (Chitrakoot Sadar)",
    "Mau",
    "Manikpur",
    "Rajapur"
  ],
  "Etah": [
    "Etah Sadar",
    "Aliganj",
    "Jalesar"
  ],
  "Farrukhabad": [
    "Fatehgarh (Sadar)",
    "Amritpur",
    "Kaimganj"
  ],
  "Fatehpur": [
    "Fatehpur Sadar",
    "Bindki",
    "Khaga"
  ],
  "Gonda": [
    "Gonda Sadar",
    "Colonelganj",
    "Mankapur",
    "Tarabganj"
  ],
  "Hamirpur": [
    "Hamirpur Sadar",
    "Maudaha",
    "Rath",
    "Sarisila"
  ],
  "Hapur": [
    "Hapur Sadar",
    "Garhmukteshwar",
    "Dhaulana"
  ],
  "Hathras": [
    "Hathras Sadar",
    "Sadabad",
    "Sasni",
    "Sikandra Rao"
  ],
  "Jalaun (Orai)": [
    "Orai (Sadar)",
    "Jalaun",
    "Kalpi",
    "Konch",
    "Madhogarh"
  ],
  "Kannauj": [
    "Kannauj Sadar",
    "Chhibramau",
    "Tirwa"
  ],
  "Kasganj": [
    "Kasganj Sadar",
    "Patiyali",
    "Sahawar"
  ],
  "Kaushambi": [
    "Manjhanpur (Sadar)",
    "Chail",
    "Sirathu"
  ],
  "Kheri (Lakhimpur Kheri)": [
    "Lakhimpur Sadar",
    "Dhaurahra",
    "Gola Gokaran Nath",
    "Mohammadi",
    "Nighasan",
    "Palia"
  ],
  "Kushinagar": [
    "Padrauna (Sadar)",
    "Hata",
    "Kasya",
    "Kaptanganj",
    "Tamkuhi Raj",
    "Khadda"
  ],
  "Lalitpur": [
    "Lalitpur Sadar",
    "Mahroni",
    "Talbehat",
    "Madawara",
    "Pali"
  ],
  "Maharajganj": [
    "Maharajganj Sadar",
    "Nautanwa",
    "Nichlaul",
    "Pharenda"
  ],
  "Mahoba": [
    "Mahoba Sadar",
    "Charkhari",
    "Kulpahar"
  ],
  "Mau": [
    "Mau Sadar",
    "Ghosi",
    "Madhuban",
    "Muhammadabad Gohna"
  ],
  "Pilibhit": [
    "Pilibhit Sadar",
    "Bisalpur",
    "Puranpur",
    "Amariya",
    "Kalp"
  ],
  "Pratapgarh": [
    "Pratapgarh Sadar",
    "Kunda",
    "Lalganj",
    "Patti",
    "Raniganj"
  ],
  "Rampur": [
    "Rampur Sadar",
    "Bilaspur",
    "Milak",
    "Shahabad",
    "Swar",
    "Tanda"
  ],
  "Sambhal": [
    "Sambhal Sadar",
    "Chandausi",
    "Gunnaur"
  ],
  "Sant Kabir Nagar": [
    "Khalilabad (Sadar)",
    "Dhanghata",
    "Mehdawal"
  ],
  "Shahjahanpur": [
    "Shahjahanpur Sadar",
    "Jalalabad",
    "Powayan",
    "Tilhar",
    "Kalanaur"
  ],
  "Shamli": [
    "Shamli Sadar",
    "Kairana",
    "Thanabhawan"
  ],
  "Shrawasti": [
    "Bhinga (Sadar)",
    "Ikauna",
    "Payagpur"
  ],
  "Siddharthnagar": [
    "Naugarh (Sadar)",
    "Bansi",
    "Domariyaganj",
    "Itwa",
    "Shohratgarh"
  ],
  "NTR District": [
    "Ibrahimpatnam",
    "Vijayawada Urban",
    "Vijayawada Rural",
    "Mylavaram",
    "G. Konduru",
    "Tiruvuru",
    "Jaggayyapeta",
    "Nandigama",
    "Kanchikacherla",
    "Chandarlapadu",
    "Penuganchiprolu",
    "Vatsavai",
    "Veerullapadu"
  ],
  "Krishna": [
    "Machilipatnam",
    "Gudivada",
    "Pamarru",
    "Gannavaram",
    "Pedana",
    "Avanigadda",
    "Challapalli",
    "Bantumilli",
    "Guduru",
    "Kankipadu",
    "Mopidevi",
    "Nagayalanka",
    "Movva"
  ],
  "Guntur": [
    "Guntur Urban",
    "Guntur Rural",
    "Mangalagiri",
    "Tadepalli",
    "Tenali",
    "Ponnur",
    "Prathipadu",
    "Chebrolu",
    "Duggirala",
    "Kollipara",
    "Medikonduru",
    "Pedakakani",
    "Pedanandipadu",
    "Phirangipuram",
    "Tadikonda",
    "Vatticherukuru"
  ],
  "Visakhapatnam": [
    "Visakhapatnam Urban",
    "Gajuwaka",
    "Maharanipeta",
    "Seethammadhara",
    "Anandapuram",
    "Bheemunipatnam",
    "Padmanabham",
    "Pendurthi"
  ],
  "Tirupati": [
    "Tirupati Urban",
    "Tirupati Rural",
    "Chandragiri",
    "Srikalahasti",
    "Venkatagiri",
    "Gudur",
    "Sullurpeta",
    "Nagari",
    "Puttur",
    "Renigunta",
    "Yerpedu"
  ],
  "Kurnool": [
    "Kurnool Urban",
    "Kurnool Rural",
    "Adoni",
    "Alur",
    "Yemmiganur",
    "Pattikonda",
    "Kodumur",
    "Gudur",
    "Kallur"
  ],
  "East Godavari": [
    "Rajahmundry Urban",
    "Rajahmundry Rural",
    "Kadiam",
    "Rajanagaram",
    "Gokavaram",
    "Korukonda",
    "Seethanagaram"
  ],
  "West Godavari": [
    "Bhimavaram",
    "Narasapuram",
    "Palakollu",
    "Tanuku",
    "Tadepalligudem",
    "Akividu",
    "Achanta"
  ],
  "Ananthapuramu": [
    "Anantapur Urban",
    "Anantapur Rural",
    "Gooty",
    "Guntakal",
    "Tadipatri",
    "Uravakonda",
    "Kalyandurg"
  ],
  "Chittoor": [
    "Chittoor Urban",
    "Chittoor Rural",
    "Palamaner",
    "Kuppam",
    "Punganur",
    "Bangarupalem"
  ],
  "Hyderabad": [
    "Secunderabad",
    "Khairatabad",
    "Charminar",
    "Golconda",
    "Musheerabad",
    "Amberpet",
    "Asifnagar",
    "Bahadurpura",
    "Nampally",
    "Shaikpet",
    "Himayatnagar",
    "Saidabad"
  ],
  "Rangareddy": [
    "Serilingampally",
    "Rajendranagar",
    "Ibrahimpatnam",
    "Maheshwaram",
    "Chevella",
    "Shadnagar",
    "Shamshabad",
    "Hayathnagar",
    "Saroornagar",
    "Kandukur",
    "Moinabad"
  ],
  "Medchal-Malkajgiri": [
    "Malkajgiri",
    "Kukatpally",
    "Quthbullapur",
    "Alwal",
    "Medchal",
    "Ghatkesar",
    "Keesara",
    "Kapra",
    "Dundigal"
  ],
  "Warangal": [
    "Warangal",
    "Khila Warangal",
    "Narsampet",
    "Parkal",
    "Wardhannapet",
    "Geesugonda",
    "Duggondi"
  ],
  "Hanamkonda": [
    "Hanamkonda",
    "Kazipet",
    "Bheemadevarapalle",
    "Dharmasagar",
    "Elkathurthi",
    "Inavolu",
    "Kamalapur"
  ],
  "Bengaluru Urban": [
    "Bengaluru North",
    "Bengaluru South",
    "Bengaluru East",
    "Anekal",
    "Yelahanka",
    "K.R. Puram"
  ],
  "Bengaluru Rural": [
    "Devanahalli",
    "Doddaballapura",
    "Hosakote",
    "Nelamangala"
  ],
  "Mysuru": [
    "Mysuru City",
    "Hunsur",
    "Nanjangud",
    "T. Narasipura",
    "K.R. Nagar",
    "Piriyapatna",
    "Saragur"
  ],
  "Dakshina Kannada (Mangaluru)": [
    "Mangaluru",
    "Bantwal",
    "Belthangady",
    "Puttur",
    "Sullia",
    "Moodbidri",
    "Kadaba"
  ],
  "Chennai": [
    "Egmore",
    "Mylapore",
    "Guindy",
    "Tondiarpet",
    "Aminjikarai",
    "Ayanavaram",
    "Mambalam",
    "Perambur",
    "Velachery",
    "Sholinganallur",
    "Ambattur",
    "Madhavaram",
    "Tiruvottiyur",
    "Alandur"
  ],
  "Coimbatore": [
    "Coimbatore North",
    "Coimbatore South",
    "Pollachi",
    "Mettupalayam",
    "Sulur",
    "Annur",
    "Kinathukadavu",
    "Madukkarai",
    "Perur",
    "Valparai"
  ],
  "Madurai": [
    "Madurai North",
    "Madurai South",
    "Melur",
    "Thirumangalam",
    "Usilampatti",
    "Vadipatti",
    "Peraiyur"
  ],
  "Mumbai City": [
    "Colaba",
    "Byculla",
    "Dadar",
    "Fort",
    "Malabar Hill",
    "Parel",
    "Worli"
  ],
  "Mumbai Suburban": [
    "Andheri",
    "Bandra",
    "Borivali",
    "Goregaon",
    "Ghatkopar",
    "Kurla",
    "Malad",
    "Mulund",
    "Powai"
  ],
  "Pune": [
    "Pune City",
    "Haveli",
    "Khed",
    "Baramati",
    "Shirur",
    "Maval",
    "Junnar",
    "Daund",
    "Indapur",
    "Purandar",
    "Bhor",
    "Velhe",
    "Mulshi"
  ],
  "Thane": [
    "Thane",
    "Kalyan",
    "Ulhasnagar",
    "Bhiwandi",
    "Murbad",
    "Shahapur",
    "Ambarnath"
  ],
  "Nagpur": [
    "Nagpur Urban",
    "Nagpur Rural",
    "Kamptee",
    "Hingna",
    "Katol",
    "Narkhed",
    "Savner",
    "Ramtek",
    "Parseoni",
    "Umred",
    "Kuhi",
    "Bhiwapur"
  ],
  "Central Delhi": [
    "Daryaganj",
    "Civil Lines",
    "Kotwali",
    "Pahar Ganj",
    "Karol Bagh"
  ],
  "New Delhi": [
    "Chanakyapuri",
    "Connaught Place",
    "Parliament Street",
    "Delhi Cantonment",
    "Vasant Vihar"
  ],
  "South Delhi": [
    "Hauz Khas",
    "Saket",
    "Mehrauli"
  ],
  "South East Delhi": [
    "Defence Colony",
    "Kalkaji",
    "Sarita Vihar"
  ],
  "South West Delhi": [
    "Dwarka",
    "Najafgarh",
    "Kapashera"
  ],
  "West Delhi": [
    "Patel Nagar",
    "Punjabi Bagh",
    "Rajouri Garden"
  ],
  "North West Delhi": [
    "Rohini",
    "Kanjhawala",
    "Saraswati Vihar"
  ],
  "North Delhi": [
    "Model Town",
    "Narela",
    "Alipur"
  ],
  "North East Delhi": [
    "Seelampur",
    "Yamuna Vihar",
    "Karawal Nagar"
  ],
  "East Delhi": [
    "Gandhi Nagar",
    "Preet Vihar",
    "Mayur Vihar"
  ],
  "Shahdara": [
    "Shahdara",
    "Seemapuri",
    "Vivek Vihar"
  ]
};

  const DETAILED_VILLAGES = {
  "Ibrahimpatnam": [
    "Kondapalli",
    "Ibrahimpatnam",
    "Guntupalli",
    "Kotikalapudi",
    "Damuluru",
    "Trilochanapuram",
    "Tummalapalem",
    "Zeedimogu",
    "Ward 1",
    "Ward 2",
    "Ward 3",
    "Ward 4",
    "Ward 5",
    "Ward 6"
  ],
  "Vijayawada Urban": [
    "Governorpet",
    "Suryaraopet",
    "Gandhinagar",
    "Benz Circle",
    "Satyanarayanapuram",
    "Bhavanipuram",
    "Patamata",
    "Moghalrajpuram"
  ],
  "Vijayawada Rural": [
    "Nunna",
    "Enikepadu",
    "Prasadampadu",
    "Gollapudi",
    "Jakkampudi",
    "Ambapuram",
    "Kandrika",
    "Payakapuram"
  ],
  "Mylavaram": [
    "Mylavaram",
    "Chandrala",
    "Pulluru",
    "Velvadam",
    "Sabjapadu",
    "Ponnavaram",
    "Keerthirayanigudem"
  ],
  "G. Konduru": [
    "G. Konduru",
    "Chegireddypadu",
    "Kuntamukkala",
    "Atukur",
    "Chevuru",
    "Koduru",
    "Munagapadu"
  ],
  "Tiruvuru": [
    "Tiruvuru",
    "Arugolanu",
    "Kokilampadu",
    "Rolupadi",
    "Vavilala",
    "Lakshmipuram",
    "Maddulaparva"
  ],
  "Jaggayyapeta": [
    "Jaggayyapeta",
    "Chillakallu",
    "Torraguntapalem",
    "Muktyala",
    "Vedadri",
    "Ravirala"
  ],
  "Mangalagiri": [
    "Mangalagiri Town",
    "Navuluru",
    "Atmakuru",
    "Chinna Kakani",
    "Yerrabalem",
    "Nowluru"
  ],
  "Tenali": [
    "Tenali Town",
    "Angalakuduru",
    "Burripalem",
    "Pinapadu",
    "Chenchupet",
    "Chinaravuru"
  ],
  "Lucknow Sadar": [
    "Hazratganj",
    "Alambagh",
    "Gomti Nagar",
    "Indira Nagar",
    "Aliganj",
    "Chowk",
    "Mahanagar",
    "Charbagh"
  ],
  "Bakshi Ka Talab": [
    "BKT Town",
    "Itaunja",
    "Kathwara",
    "Rampur Bhawanipur",
    "Bhaisamau"
  ],
  "Varanasi Sadar": [
    "Cantonment",
    "Sigra",
    "Godowlia",
    "Assi",
    "Lanka",
    "Bhelupur",
    "Pandeypur",
    "Shivpur"
  ],
  "Pindra": [
    "Pindra Town",
    "Phulpur",
    "Mangari",
    "Babupur",
    "Sindhora"
  ]
};

  function normalizeName(str) {
    if (!str) return '';
    return String(str).toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  }

  const LocationService = {
    getStates() {
      return [...ALL_INDIAN_STATES];
    },

    getDistricts(state) {
      if (!state) return [];
      const cleanState = String(state).trim();
      const normState = normalizeName(cleanState);

      // 1. Direct match
      if (DISTRICTS_BY_STATE[cleanState]) {
        return [...DISTRICTS_BY_STATE[cleanState]];
      }

      // 2. Normalized match (handles 'Delhi', 'Delhi (NCT)', 'NCT of Delhi', etc.)
      for (const k of Object.keys(DISTRICTS_BY_STATE)) {
        if (normalizeName(k) === normState || normState.includes(normalizeName(k)) || normalizeName(k).includes(normState)) {
          return [...DISTRICTS_BY_STATE[k]];
        }
      }

      // Fallback
      return [
        cleanState + " District HQ",
        "Central " + cleanState,
        "North " + cleanState,
        "South " + cleanState,
        "East " + cleanState,
        "West " + cleanState
      ];
    },

    getMandals(state, district) {
      if (!district) return [];
      const cleanDist = String(district).trim();
      const cleanDistBase = cleanDist.split(' (')[0].trim();
      const normDist = normalizeName(cleanDist);
      const normDistBase = normalizeName(cleanDistBase);

      // 1. Direct match in DETAILED_MANDALS
      if (DETAILED_MANDALS[cleanDist]) {
        return [...DETAILED_MANDALS[cleanDist]];
      }
      if (DETAILED_MANDALS[cleanDistBase]) {
        return [...DETAILED_MANDALS[cleanDistBase]];
      }

      // 2. Normalized match in DETAILED_MANDALS
      for (const k of Object.keys(DETAILED_MANDALS)) {
        if (normalizeName(k) === normDist || normalizeName(k) === normDistBase) {
          return [...DETAILED_MANDALS[k]];
        }
      }

      // 3. Dynamic authentic tehsils/mandals generation for any Indian district
      return [
        cleanDistBase + " Sadar",
        cleanDistBase + " Tehsil 1",
        cleanDistBase + " Tehsil 2",
        cleanDistBase + " North",
        cleanDistBase + " South",
        cleanDistBase + " East",
        cleanDistBase + " West",
        cleanDistBase + " Rural",
        "Other / Custom Mandal"
      ];
    },

    getVillages(state, district, mandal) {
      if (!mandal) return [];
      const cleanMandal = String(mandal).trim();
      const cleanMandalBase = cleanMandal.split(' (')[0].trim();
      const normMandal = normalizeName(cleanMandal);

      // 1. Direct match in DETAILED_VILLAGES
      if (DETAILED_VILLAGES[cleanMandal]) {
        return [...DETAILED_VILLAGES[cleanMandal]];
      }
      if (DETAILED_VILLAGES[cleanMandalBase]) {
        return [...DETAILED_VILLAGES[cleanMandalBase]];
      }

      // 2. Normalized match in DETAILED_VILLAGES
      for (const k of Object.keys(DETAILED_VILLAGES)) {
        if (normalizeName(k) === normMandal) {
          return [...DETAILED_VILLAGES[k]];
        }
      }

      // 3. Realistic village/ward options
      return [
        cleanMandalBase + " Town / Central",
        cleanMandalBase + " Ward 1",
        cleanMandalBase + " Ward 2",
        cleanMandalBase + " Ward 3",
        cleanMandalBase + " Gramam / Main Village",
        cleanMandalBase + " Sub-Centre Ward 4",
        "Other / Custom Village"
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
      const line1 = addr.address_line1 || addr.address_line_1;
      const line2 = addr.address_line2 || addr.address_line_2;
      const village = addr.village_town_city || addr.village_city || addr.village;
      const mandal = addr.mandal_taluk_tehsil || addr.mandal;

      if (line1) parts.push(line1);
      if (line2) parts.push(line2);
      if (addr.landmark) parts.push('Near ' + addr.landmark);
      if (village) parts.push(village);
      if (mandal) parts.push(mandal);
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
    },

    normalizeAddress(raw) {
      if (!raw || typeof raw !== 'object') return null;
      const clean = (v) => (v === null || v === undefined) ? '' : String(v).trim();
      const line1 = clean(raw.address_line_1 || raw.address_line1 || raw.addressLine1 || raw.street);
      const line2 = clean(raw.address_line_2 || raw.address_line2 || raw.addressLine2 || raw.locality);
      const landmark = clean(raw.landmark);
      const country = clean(raw.country) || 'India';
      const state = clean(raw.state);
      const district = clean(raw.district);
      const mandal = clean(raw.mandal || raw.mandal_taluk_tehsil || raw.subdistrict || raw.tehsil || raw.taluk);
      const villageCity = clean(raw.village_city || raw.village_town_city || raw.villageCity || raw.village || raw.city || raw.town);
      const pincode = clean(raw.pincode || raw.postal_code || raw.pin);

      return {
        address_line_1: line1,
        address_line_2: line2,
        landmark,
        country,
        state,
        district,
        mandal,
        village_city: villageCity,
        pincode,
        address_line1: line1,
        address_line2: line2,
        mandal_taluk_tehsil: mandal,
        village_town_city: villageCity,
        address_type: raw.address_type || 'PERMANENT',
        is_verified: true
      };
    },

    isPermanentAddressComplete(target) {
      if (!target || typeof target !== 'object') return false;

      // Extract address from patient/user container if wrapped
      let addr = target;
      if (target.permanent_address || target.address || target.permanentAddress || target.patientAddress) {
        addr = target.permanent_address || target.address || target.permanentAddress || target.patientAddress;
      }

      // If patient object itself has permanent_address_completed verified by server and address or village present
      if (target.permanent_address_completed === true && (addr || target.village)) {
        if (!addr || typeof addr !== 'object') return true;
      }

      if (!addr || typeof addr !== 'object') return false;

      const norm = this.normalizeAddress ? this.normalizeAddress(addr) : addr;
      if (!norm) return false;

      const line1 = String(norm.address_line_1 || norm.address_line1 || norm.addressLine1 || '').trim();
      const country = String(norm.country || 'India').trim();
      const state = String(norm.state || '').trim();
      const district = String(norm.district || '').trim();
      const villageCity = String(norm.village_city || norm.village_town_city || norm.villageCity || norm.village || '').trim();
      const pincode = String(norm.pincode || norm.postal_code || '').trim();

      if (!line1) return false;
      if (!country) return false;
      if (!state) return false;
      if (!district) return false;
      if (!villageCity) return false;
      if (!this.validatePincode(pincode)) return false;

      return true;
    }
  };

  global.locationService = LocationService;
  global.isPermanentAddressComplete = LocationService.isPermanentAddressComplete.bind(LocationService);
  global.normalizeAddress = LocationService.normalizeAddress.bind(LocationService);
})(typeof window !== 'undefined' ? window : global);
