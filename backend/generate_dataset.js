import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define crops and their specific diseases/conditions
const cropData = {
  "Rice": {
    varieties: ["Basmati", "Jasmine", "IR64", "Sonam", "Swarna", "Kanak"],
    diseases: [
      {
        name: "Rice Blast",
        severity: "High",
        symptoms: "Spindle-shaped lesions on leaves with gray or whitish centers and brown borders. Neck rot causing head to fall over.",
        causes: "Fungal pathogen Magnaporthe oryzae. Favored by high humidity, warm temperatures, and excessive nitrogen.",
        prevention: "Plant resistant varieties, avoid excessive nitrogen application, maintain proper water depth.",
        treatment: "Spray systemic fungicides like Tricyclazole, Carbendazim, or Azoxystrobin."
      },
      {
        name: "Brown Spot",
        severity: "Medium",
        symptoms: "Oval or circular dark brown lesions with yellow halos on leaves and glumes. Leads to poor grain filling.",
        causes: "Fungus Bipolaris oryzae. Often associated with nutrient-deficient or water-stressed soils.",
        prevention: "Improve soil fertility (apply potassium/silicon), use clean seeds, ensure balanced fertilization.",
        treatment: "Spray Mancozeb, Propiconazole, or Copper oxychloride fungicides."
      },
      {
        name: "Bacterial Leaf Blight",
        severity: "High",
        symptoms: "Wavy yellow stripes starting from leaf tips and margins, turning white/gray. Milky bacterial ooze droplets on leaves.",
        causes: "Bacteria Xanthomonas oryzae. Spread by wind, rain, and infected irrigation water in warm weather.",
        prevention: "Grow resistant cultivars, avoid field flooding, keep fields clean of crop residues.",
        treatment: "Apply Copper hydroxide combined with Streptomycin sulfate. Avoid over-fertilizing with nitrogen."
      },
      {
        name: "Sheath Blight",
        severity: "Medium",
        symptoms: "Greenish-gray, oval lesions on leaf sheaths near water line. White cottony mycelium may appear in humid conditions.",
        causes: "Fungus Rhizoctonia solani. Survives in soil and crop residue. Favored by high density planting.",
        prevention: "Wider plant spacing, crop rotation, destroy straw of previous infected crop.",
        treatment: "Spray Validamycin, Hexaconazole, or Pencycuron."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Lush green upright leaves, strong stalks, and healthy developing seed heads without spots or discoloration.",
        causes: "Optimal nutrient levels, correct irrigation, and disease-free environment.",
        prevention: "Maintain current irrigation, weeding, and balanced fertilizer schedule.",
        treatment: "No treatment required. Maintain regular monitoring."
      }
    ]
  },
  "Wheat": {
    varieties: ["Durum", "Sharbati", "Kalyansona", "HD2967", "Sonalika", "Lok-1"],
    diseases: [
      {
        name: "Wheat Stem Rust",
        severity: "High",
        symptoms: "Elongated, reddish-brown pustules on stems and leaves that rupture to release powdery orange-brown spores.",
        causes: "Fungus Puccinia graminis. Spreads rapidly through windborne spores in warm, humid daytime weather.",
        prevention: "Plant rust-resistant seed varieties, eradicate alternative hosts like barberry shrubs.",
        treatment: "Apply triazole fungicides such as Tebuconazole, Propiconazole, or Cyproconazole."
      },
      {
        name: "Powdery Mildew",
        severity: "Medium",
        symptoms: "White, powdery patches of fungal growth on the upper surface of leaves, stems, and heads. Leaves turn yellow.",
        causes: "Fungus Blumeria graminis. Thrives in cool, damp, shaded conditions with dense crop canopy.",
        prevention: "Avoid high seeding rates, ensure balanced nitrogen use, choose resistant varieties.",
        treatment: "Spray fungicides like Triadimefon, Propiconazole, or sulfur-based formulations."
      },
      {
        name: "Loose Smut",
        severity: "High",
        symptoms: "Grains in the wheat head are replaced by a black, powdery mass of fungal spores. Spores are blown away, leaving a bare rachis.",
        causes: "Fungus Ustilago nuda. Seed-borne infection that manifests only at flowering stage.",
        prevention: "Use certified disease-free seeds. Perform solar heat or hot water treatment on seeds.",
        treatment: "Treat seeds with systemic fungicides like Carboxin, Carbendazim, or Tebuconazole before sowing."
      },
      {
        name: "Septoria Leaf Blotch",
        severity: "Medium",
        symptoms: "Irregular reddish-brown lesions with tiny black dots (pycnidia) appearing first on lower leaves, spreading upward.",
        causes: "Fungus Zymoseptoria tritici. Spread by rain splash and wind in wet, windy weather.",
        prevention: "Crop rotation, burying infected crop residues, sowing late to avoid early infection.",
        treatment: "Spray strobilurin or triazole fungicides at early stages of tillering/jointing."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Healthy golden-green leaves and spikes. No powdery coating or rust pustules present on stems.",
        causes: "Proper soil nutrition, cool dry weather, and rust-resistant crop variety.",
        prevention: "Keep monitoring for signs of rust or mildew. Ensure optimal watering.",
        treatment: "No treatment required."
      }
    ]
  },
  "Tomato": {
    varieties: ["Roma", "Beefsteak", "Cherry", "Arka Vikas", "Pusa Ruby", "San Marzano"],
    diseases: [
      {
        name: "Tomato Leaf Curl",
        severity: "High",
        symptoms: "Severe curling of leaves upward and inward, yellowing of leaf margins, puckering, and extreme plant stunting.",
        causes: "Tomato Leaf Curl Virus (TLCV) transmitted by whiteflies. Common in dry, hot seasons.",
        prevention: "Install yellow sticky traps, use insect nets in nurseries, and remove alternate weed hosts.",
        treatment: "Spray systemic insecticides like Imidacloprid, Thiamethoxam, or Neem Oil to control whiteflies."
      },
      {
        name: "Early Blight",
        severity: "Medium",
        symptoms: "Concentric target-board rings of dark brown spots on older leaves, causing them to yellow and drop. Stem lesions.",
        causes: "Fungal pathogen Alternaria solani. Favored by warm, wet, humid conditions.",
        prevention: "Practice crop rotation, prune lower leaves, use drip irrigation to keep foliage dry.",
        treatment: "Apply protectant fungicides like Chlorothalonil or Mancozeb, or copper-based sprays."
      },
      {
        name: "Late Blight",
        severity: "High",
        symptoms: "Large, dark water-soaked lesions on leaves and stems. White fuzzy mold on undersides in wet conditions. Brown leathery fruit rot.",
        causes: "Pathogen Phytophthora infestans. Spreads rapidly in cool, wet, humid weather.",
        prevention: "Ensure good spacing for air circulation, avoid overhead watering, select resistant cultivars.",
        treatment: "Apply systemic fungicides like Metalaxyl, Cymoxanil, or copper-based sprays immediately."
      },
      {
        name: "Bacterial Wilt",
        severity: "High",
        symptoms: "Rapid wilting of the entire plant starting from the top, without initial leaf yellowing. Stem interior turns brown.",
        causes: "Bacterium Ralstonia solanacearum. Soil-borne pathogen that enters through root wounds in warm soil.",
        prevention: "Maintain soil pH around 6.5, practice long crop rotations, use clean tools and certified seeds.",
        treatment: "No effective chemical cure once infected. Remove and burn infected plants, treat soil with solarization."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Bright green leaves, vigorous branching, and firm red or green fruits with no spotting or leaf curling.",
        causes: "Good soil aeration, balanced NPK nutrients, and regular pest management.",
        prevention: "Continue drip irrigation and soil testing. Prune lower branches to prevent soil contact.",
        treatment: "No treatment required."
      }
    ]
  },
  "Potato": {
    varieties: ["Kufri Jyoti", "Russet", "Yukon Gold", "Kufri Bahar", "Red Pontiac"],
    diseases: [
      {
        name: "Late Blight",
        severity: "High",
        symptoms: "Water-soaked dark lesions on leaves, white cottony growth on leaf undersides in wet weather. Tubers show dry brown rot.",
        causes: "Oomycete pathogen Phytophthora infestans. Favored by cool, wet, humid weather.",
        prevention: "Plant certified disease-free seed tubers, rotate crops, destroy volunteer potato plants.",
        treatment: "Spray contact/systemic fungicides like Mancozeb, Metalaxyl, or Copper hydroxide."
      },
      {
        name: "Early Blight",
        severity: "Medium",
        symptoms: "Small, dark, concentric ring spots on older leaves. Can cause defoliation and sunken brown lesions on tubers.",
        causes: "Fungus Alternaria solani. Thrives in dry weather alternating with wet spells.",
        prevention: "Maintain high soil fertility, spray preventative fungicides, prune lower leaves.",
        treatment: "Use fungicides containing Difenoconazole, Chlorothalonil, or Boscalid."
      },
      {
        name: "Common Scab",
        severity: "Low",
        symptoms: "Dark brown, corky, raised or pitted lesions on the skin of tubers, reducing market value.",
        causes: "Soil bacterium Streptomyces scabies. Favored by dry soils and alkaline/neutral pH.",
        prevention: "Maintain soil pH below 5.5, keep soil moist during tuber initiation, rotate with alfalfa or rye.",
        treatment: "No chemical treatment is effective post-infection. Treat seed tubers with Mancozeb before planting."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Vibrant dark green canopy, strong upright stems, and smooth-skinned tubers with no lesions or scabs.",
        causes: "Acidic soil pH, balanced moisture, and disease-free seed tubers.",
        prevention: "Monitor soil moisture during tuberization. Maintain soil pH around 5.2-5.5.",
        treatment: "No treatment required."
      }
    ]
  },
  "Cotton": {
    varieties: ["BT Cotton", "Desi Cotton", "MCU-5", "Suraj", "Suvin"],
    diseases: [
      {
        name: "Cotton Leaf Curl Virus",
        severity: "High",
        symptoms: "Upward or downward curling of leaf margins, thickening of leaf veins, and cup-like growth on undersides.",
        causes: "Cotton Leaf Curl Virus transmitted by Whiteflies (Bemisia tabaci). Favored by warm dry weather.",
        prevention: "Plant resistant varieties, destroy alternate host weeds, control whitefly population.",
        treatment: "Spray systemic insecticides like Acetamiprid, Diafenthiuron, or Spiromesifen to control vectors."
      },
      {
        name: "Verticillium Wilt",
        severity: "High",
        symptoms: "Mottled yellowing between leaf veins (tiger-stripe appearance). Wilting, leaf drop, and brown discoloration of stem xylem.",
        causes: "Soil-borne fungus Verticillium dahliae. Thrives in cool, damp soils and high nitrogen levels.",
        prevention: "Crop rotation with non-hosts like maize, solarize soil, avoid excess irrigation.",
        treatment: "No direct chemical control. Apply bio-agents like Trichoderma viride to soil. Remove infected plants."
      },
      {
        name: "Bacterial Blight",
        severity: "Medium",
        symptoms: "Water-soaked angular leaf spots bordered by veins (angular leaf spot), black lesions on stems (blackarm), and boll rot.",
        causes: "Bacterium Xanthomonas citri pv. malvacearum. Spread by splashing rain and wind.",
        prevention: "Acid-delint seed before sowing, remove previous crop residue, plant resistant hybrids.",
        treatment: "Spray Streptomycin sulfate combined with Copper oxychloride."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Broad, green, healthy leaves. Strong stems and fluffy white cotton bolls with no discoloration or wilting.",
        causes: "Optimal whitefly control, balanced soil nutrition, and well-drained loamy soil.",
        prevention: "Monitor whitefly counts weekly. Apply preventive organic neem sprays.",
        treatment: "No treatment required."
      }
    ]
  },
  "Corn": {
    varieties: ["Sweet Corn", "Flint Corn", "DeKalb", "Pioneer", "Ganga-11"],
    diseases: [
      {
        name: "Common Smut",
        severity: "Medium",
        symptoms: "Large, white, fleshy galls or swellings on ears, tassels, stalks, or leaves. Galls eventually rupture to release black spores.",
        causes: "Fungus Ustilago maydis. Enters through wounds caused by hail, insects, or cultivation machinery.",
        prevention: "Avoid mechanical damage to stalks, choose resistant hybrids, maintain crop rotation.",
        treatment: "Remove galls before they rupture. Fungicide seed treatments like Fludioxonil can help."
      },
      {
        name: "Southern Rust",
        severity: "High",
        symptoms: "Numerous small, circular, orange-brown pustules on the upper leaf surface, causing premature leaf death.",
        causes: "Fungus Puccinia polysora. Favored by hot, humid weather (above 25°C).",
        prevention: "Plant resistant hybrids, plant early to avoid peak spore loads.",
        treatment: "Apply foliar fungicides like Pyraclostrobin, Tebuconazole, or Azoxystrobin."
      },
      {
        name: "Gray Leaf Spot",
        severity: "High",
        symptoms: "Rectangular, tan-to-gray lesions bordered by leaf veins, starting on lower leaves and moving up.",
        causes: "Fungus Cercospora zeae-maydis. Thrives in warm, highly humid conditions with no-till practices.",
        prevention: "Tillage to bury crop residue, crop rotation, plant resistant varieties.",
        treatment: "Spray triazole or strobilurin fungicides at early silking stage if disease pressure is high."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Deep green leaves, strong stalks, large ears filled with plump yellow kernels. No powdery spots or smut galls.",
        causes: "Good soil nitrogen, appropriate plant spacing, and low pest injury.",
        prevention: "Maintain spacing, apply organic compost, check for corn borers.",
        treatment: "No treatment required."
      }
    ]
  },
  "Soybean": {
    varieties: ["JS-335", "Williams 82", "JS-9560", "Bragg"],
    diseases: [
      {
        name: "Soybean Rust",
        severity: "High",
        symptoms: "Small, tan-to-reddish brown lesions on leaf undersides, containing raised pustules that release light-colored spores. Defoliation.",
        causes: "Fungus Phakopsora pachyrhizi. Spreads rapidly in prolonged wetness and warm temperatures.",
        prevention: "Monitor fields regularly, plant early-maturing cultivars, avoid planting near alternative hosts.",
        treatment: "Apply protective/curative fungicides like Triadimenol, Propiconazole, or Tebuconazole."
      },
      {
        name: "Frogeye Leaf Spot",
        severity: "Medium",
        symptoms: "Small, circular spots on leaves with gray centers and dark reddish-brown borders. Sunken lesions on stems and pods.",
        causes: "Fungus Cercospora sojina. Overwinters in crop residue, spread by wind/splashing water in warm wet conditions.",
        prevention: "Use pathogen-free seeds, practice crop rotation, tillage, and plant resistant varieties.",
        treatment: "Spray strobilurin or triazole fungicides if lesions appear prior to pod development."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Bright green leaves, abundant healthy pods, and strong root system with active nitrogen-fixing nodules.",
        causes: "Healthy soil biology (rhizobia), balanced moisture, and lack of fungal pressure.",
        prevention: "Inoculate seeds with Rhizobium before planting. Ensure good drainage.",
        treatment: "No treatment required."
      }
    ]
  },
  "Apple": {
    varieties: ["Gala", "Fuji", "Honeycrisp", "Red Delicious", "Golden Delicious"],
    diseases: [
      {
        name: "Apple Scab",
        severity: "High",
        symptoms: "Olive-green to black, velvety spots on leaves and fruit. Leaves turn yellow and drop. Fruits become cracked and deformed.",
        causes: "Fungus Venturia inaequalis. Overwinters on fallen leaves. Spores released in wet spring weather.",
        prevention: "Rake and destroy fallen leaves in autumn, prune tree canopy to improve air circulation, plant scab-resistant trees.",
        treatment: "Apply protective fungicides like Captan, Mancozeb, or Myclobutanil from green tip stage onward."
      },
      {
        name: "Fire Blight",
        severity: "High",
        symptoms: "Blossoms, leaves, and twigs turn rapidly brown-black as if scorched by fire. Twig tips bend into a 'shepherd's crook'. Ooze.",
        causes: "Bacterium Erwinia amylovora. Enters through blossoms and wounds during warm, humid spring weather.",
        prevention: "Prune out infected branches 8-12 inches below visible symptoms, use resistant rootstocks, avoid heavy nitrogen fertilizing.",
        treatment: "Spray copper formulations or antibiotics like Streptomycin during bloom stage."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Vibrant green leaves, clean smooth bark, and crisp, glossy fruits free of spots, cracks, or rot.",
        causes: "Proper seasonal pruning, preventive copper sprays, and optimal spring weather.",
        prevention: "Perform regular winter pruning. Spray dormant oil to control pests.",
        treatment: "No treatment required."
      }
    ]
  },
  "Banana": {
    varieties: ["Grand Naine", "Robusta", "Dwarf Cavendish", "Red Banana"],
    diseases: [
      {
        name: "Panama Disease (Fusarium Wilt)",
        severity: "High",
        symptoms: "Yellowing and wilting of lower leaves, forming a skirt of dead leaves around the trunk. Internal vascular discoloration.",
        causes: "Soil fungus Fusarium oxysporum f. sp. cubense. Extremely persistent soil-borne pathogen spread by infected soil/water.",
        prevention: "Use tissue-cultured disease-free planting material, sanitize machinery, practice strict quarantine.",
        treatment: "No effective chemical cure. Destroy infected plants. Apply bio-agents like Pseudomonas fluorescens to soil."
      },
      {
        name: "Black Sigatoka",
        severity: "High",
        symptoms: "Dark reddish-brown streaks on leaves that expand into large necrotic spots with yellow halos, reducing leaf capacity.",
        causes: "Fungus Mycosphaerella fijiensis. Spreads via windborne spores in high rainfall and high humidity conditions.",
        prevention: "Improve drainage, remove infected leaves (de-leafing) to reduce spores, plant resistant hybrids.",
        treatment: "Apply systemic fungicides (triazoles, strobilurins) rotated with contact fungicides (Mancozeb) to prevent resistance."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Massive, healthy green leaves. Strong pseudostem. Large, clean bunches of green bananas free of spots.",
        causes: "Adequate potassium fertilizer, tissue-culture origin, and high soil organic matter.",
        prevention: "Apply potash fertilizers regularly. Maintain weeding and soil moisture.",
        treatment: "No treatment required."
      }
    ]
  },
  "Grape": {
    varieties: ["Thompson Seedless", "Cabernet Sauvignon", "Merlot", "Sharad Seedless"],
    diseases: [
      {
        name: "Downy Mildew",
        severity: "High",
        symptoms: "Yellow-green 'oil spots' on upper leaf surfaces, followed by a white, cottony fungal growth on the underside. Berries shrivel.",
        causes: "Oomycete Plasmopara viticola. Overwinters in leaf litter. Spreads during warm, wet spring/summer weather.",
        prevention: "Rake leaf litter, ensure open canopy for sun/wind exposure, avoid overhead irrigation.",
        treatment: "Spray copper fungicides, Mancozeb, or systemic oomycete-targeted chemicals like Metalaxyl."
      },
      {
        name: "Powdery Mildew",
        severity: "High",
        symptoms: "Dull gray-white powdery coating on leaves, shoots, and young berries. Infected berries split, dry up, or rot.",
        causes: "Fungus Erysiphe necator. Favored by high humidity, warm temperatures, and low direct sunlight.",
        prevention: "Shoot thinning and leaf removal to open canopy. Select resistant grape varieties.",
        treatment: "Spray wettable sulfur, potassium bicarbonate, or systemic fungicides like Myclobutanil."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Green leaves free of powdery or oily residue. Healthy, plump grape clusters without shriveling or splitting.",
        causes: "Balanced canopy management, timely preventative sulfur sprays, and well-drained sandy-loam soil.",
        prevention: "Prune canopy to maximize sun exposure. Monitor for mites and thrips.",
        treatment: "No treatment required."
      }
    ]
  },
  "Mango": {
    varieties: ["Alphonso", "Kesar", "Dasheri", "Langra", "Chausa"],
    diseases: [
      {
        name: "Mango Powdery Mildew",
        severity: "High",
        symptoms: "White powdery fungal growth on inflorescences, young leaves, and stalks. Causes flower drop and poor fruit set.",
        causes: "Fungus Oidium mangiferae. Favored by cool, dry nights and warm days during flowering season.",
        prevention: "Prune trees to allow sunlight penetration, spray preventive wettable sulfur before flowering.",
        treatment: "Spray systemic fungicides like Dinocap, Carbendazim, or Hexaconazole."
      },
      {
        name: "Anthracnose",
        severity: "High",
        symptoms: "Dark brown to black lesions on leaves, twigs, flowers, and fruits. Fruit lesions are sunken and expand rapidly.",
        causes: "Fungal pathogen Colletotrichum gloeosporioides. Active in high humidity and warm rains.",
        prevention: "Destroy fallen leaves and fruits, prune affected branches, avoid water splashing.",
        treatment: "Spray copper fungicides or Carbendazim before and after blossom stage."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Glossy dark green leaves, sturdy branches, and clean developing green or yellow mango fruits.",
        causes: "Appropriate pruning, preventive micronutrient sprays, and dry weather during fruit development.",
        prevention: "Apply balanced organic manure, irrigate during fruit development stage.",
        treatment: "No treatment required."
      }
    ]
  },
  "Sugarcane": {
    varieties: ["Co 86032", "Co 0238", "Co M 0265", "Co LK 94184"],
    diseases: [
      {
        name: "Red Rot",
        severity: "High",
        symptoms: "Reddish spots on the leaf mid-ribs. Red coloration of internal stalk tissues with white horizontal patches. Alcoholic smell.",
        causes: "Fungus Colletotrichum falcatum. Enters through wounds or infected seed pieces (setts).",
        prevention: "Use healthy seed canes, plant resistant varieties, practice crop rotation with paddy.",
        treatment: "Treat seed pieces with hot water and fungicides (Carbendazim) before planting. Rogue out infected clumps."
      },
      {
        name: "Sugarcane Smut",
        severity: "Medium",
        symptoms: "Development of a long, whip-like black structure from the shoot apex containing black spores.",
        causes: "Fungus Sporisorium scitamineum. Transmitted by wind and infected planting materials.",
        prevention: "Use healthy planting material, plant smut-resistant varieties, destroy infected whips.",
        treatment: "Treat setts with hot water (52°C) or fungicides like Triadimefon before sowing."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Tall, thick green or purple canes with green lanceolate leaves and healthy growing shoots.",
        causes: "Hot-water sett treatment, balanced nitrogen/potash fertilizer, and regular weeding.",
        prevention: "Keep field well-drained, control sugarcane borers using biocontrol agents.",
        treatment: "No treatment required."
      }
    ]
  },
  "Orange": {
    varieties: ["Nagpur Mandarin", "Valencia Orange", "Washington Navel", "Khasi Mandarin"],
    diseases: [
      {
        name: "Citrus Canker",
        severity: "High",
        symptoms: "Raised, corky, brown lesions with oily margins on leaves, twigs, and fruits. Lesions are surrounded by yellow halos.",
        causes: "Bacterium Xanthomonas citri. Spread by wind, rain, and leaf miners in warm, wet weather.",
        prevention: "Plant windbreaks, prune infected twigs during dry season, use disease-free nursery stock.",
        treatment: "Spray copper-based bactericides combined with Streptomycin sulfate."
      },
      {
        name: "Citrus Greening (Huanglongbing)",
        severity: "High",
        symptoms: "Asymmetrical leaf mottling, yellowing of shoots, stunted growth, and small, misshapen, green bitter fruits.",
        causes: "Bacterium Candidatus Liberibacter asiaticus, transmitted by the Asian citrus psyllid vector.",
        prevention: "Use disease-free nursery trees, control psyllids, remove infected trees quickly.",
        treatment: "No cure exists. Control psyllids using insecticides like Imidacloprid. Apply nutritional sprays to support tree vigor."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Dense green foliage, white fragrant blossoms, and round orange fruits with smooth skins and no spots.",
        causes: "Regular psyllid vector management, copper fungicide spray, and rich sandy loam soil.",
        prevention: "Monitor for psyllids. Maintain correct nitrogen, phosphorus, and potassium levels.",
        treatment: "No treatment required."
      }
    ]
  },
  "Coffee": {
    varieties: ["Arabica", "Robusta", "Kent", "S.795"],
    diseases: [
      {
        name: "Coffee Leaf Rust",
        severity: "High",
        symptoms: "Powdery orange spots on the undersides of leaves, causing premature defoliation and severe yield loss.",
        causes: "Fungus Hemileia vastatrix. Favored by rain, high humidity, and temperatures around 22°C.",
        prevention: "Use rust-resistant cultivars, prune trees for ventilation, apply shade management.",
        treatment: "Spray copper oxychloride or systemic fungicides like Triadimefon or Hexaconazole."
      },
      {
        name: "Coffee Berry Disease",
        severity: "High",
        symptoms: "Sunken, dark brown lesions on coffee berries, expanding to destroy the entire berry, turning it black.",
        causes: "Fungus Colletotrichum kahawae. Thrives in cool, wet highland climates.",
        prevention: "Plant resistant varieties, prune to reduce humidity in tree canopy.",
        treatment: "Spray copper fungicides or Prochloraz during early berry development."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Dark green, shiny waxy leaves, and clusters of healthy red coffee cherries (berries) along branches.",
        causes: "Balanced shade, regular pruning, and timely copper fungicide sprays.",
        prevention: "Maintain weed-free ground. Fertilize with NPK and trace minerals.",
        treatment: "No treatment required."
      }
    ]
  },
  "Onion": {
    varieties: ["Red Creole", "Yellow Granex", "N-53", "Bhima Dark Red"],
    diseases: [
      {
        name: "Purple Blotch",
        severity: "Medium",
        symptoms: "Small water-soaked lesions on leaves and seed stalks that turn purple with broad yellow halos. Tip dieback.",
        causes: "Fungus Alternaria porri. Favored by warm, humid weather and heavy dew.",
        prevention: "Crop rotation, improve drainage, use clean seeds, space plants properly.",
        treatment: "Apply fungicides like Mancozeb, Tebuconazole, or Chlorothalonil."
      },
      {
        name: "Healthy",
        severity: "None",
        symptoms: "Vibrant erect hollow leaves with strong bases, growing into large, firm bulbs with papery scales.",
        causes: "Low soil nitrogen post-bulb initiation, dry weather at harvest, and pathogen-free soil.",
        prevention: "Ensure crop rotation. Avoid overhead watering.",
        treatment: "No treatment required."
      }
    ]
  }
};

// Lists of helper fields for combinatorics
const soilTypes = ["Alluvial", "Black Soil", "Red Soil", "Laterite", "Sandy", "Clayey", "Loamy", "Silty"];
const irrigationTypes = ["Drip", "Sprinkler", "Rainfed", "Canal Irrigation", "Tubewell"];
const fertilizerTypes = ["Organic Compost", "NPK (19:19:19)", "Urea (Nitrogen)", "DAP (Phosphorus)", "Potash", "None"];

// Helper function to generate random number in range
function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Helper to pick random item from array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const totalInputsNeeded = 2300;
const generatedDataset = [];
const seenCombinations = new Set();

const crops = Object.keys(cropData);

let attempts = 0;
while (generatedDataset.length < totalInputsNeeded && attempts < 200000) {
  attempts++;

  // Cycle through crops to ensure equal distribution
  const cropName = crops[generatedDataset.length % crops.length];
  const cropDetails = cropData[cropName];
  
  // Pick a variety
  const variety = pickRandom(cropDetails.varieties);
  
  // Pick a disease/condition
  const disease = pickRandom(cropDetails.diseases);
  
  // Generate random soil pH based on crop preference/disease preference
  let pH = parseFloat(getRandomRange(5.5, 7.5).toFixed(1));
  if (disease.name.includes("Scab")) {
    pH = parseFloat(getRandomRange(6.5, 8.0).toFixed(1)); // Common Scab likes alkaline soil
  } else if (cropName === "Potato" && disease.name === "Healthy") {
    pH = parseFloat(getRandomRange(5.0, 5.5).toFixed(1)); // Healthy potatoes like acidic soil
  }
  
  // Generate random weather conditions (temp, humidity)
  let temp = Math.round(getRandomRange(18, 33));
  let humidity = Math.round(getRandomRange(50, 90));
  
  // Alter temperature/humidity based on disease preferences
  if (disease.name.includes("Late Blight")) {
    temp = Math.round(getRandomRange(15, 20)); // Late blight likes cool
    humidity = Math.round(getRandomRange(80, 98)); // and wet
  } else if (disease.name.includes("Leaf Curl") || disease.name.includes("Rust")) {
    temp = Math.round(getRandomRange(25, 34)); // Rust & Leaf curl whiteflies like warm/hot
    humidity = Math.round(getRandomRange(45, 70));
  }
  
  const soil = pickRandom(soilTypes);
  const irrigation = pickRandom(irrigationTypes);
  const fertilizer = pickRandom(fertilizerTypes);
  const sunlight = Math.round(getRandomRange(5, 10));
  
  // Create a uniqueness key based on the generated combination
  const uniqueKey = `${cropName}-${variety}-${disease.name}-${soil}-${pH}-${temp}-${humidity}-${irrigation}-${fertilizer}-${sunlight}`;
  
  if (seenCombinations.has(uniqueKey)) {
    continue; // Skip duplicate combination
  }
  seenCombinations.add(uniqueKey);

  // Synthesize entry
  generatedDataset.push({
    id: generatedDataset.length + 1,
    crop_name: cropName,
    variety: variety,
    disease_name: disease.name,
    severity: disease.severity,
    symptoms: disease.symptoms,
    causes: disease.causes,
    prevention: disease.prevention,
    treatment: disease.treatment,
    field_conditions: {
      soil_type: soil,
      soil_pH: pH,
      temperature_celsius: temp,
      humidity_percentage: humidity,
      irrigation_type: irrigation,
      sunlight_hours: sunlight,
      fertilizer_used: fertilizer
    }
  });
}

// Write the dataset to JSON
const outputPath = path.join(__dirname, 'crop_diseases_dataset.json');
fs.writeFileSync(outputPath, JSON.stringify(generatedDataset, null, 2), 'utf-8');

console.log(`✅ Generated crop diseases dataset of ${generatedDataset.length} records (Unique attempts: ${attempts})!`);
console.log(`Saved to: ${outputPath}`);

