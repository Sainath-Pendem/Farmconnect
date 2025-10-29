import React from 'react';
import './CropAdvisory.css';

const advisoryData = [
  {
    season: 'Kharif',
    crop: 'Rice',
    tips: 'Ensure proper water management through puddling. Use certified high-yielding varieties. Apply nitrogen in 3 splits and control weeds within the first 20 days.'
  },
  {
    season: 'Rabi',
    crop: 'Wheat',
    tips: 'Sow at proper depth with seed drill. Apply urea during tillering and grain filling stages. Irrigate at critical stages like crown root initiation and flowering.'
  },
  {
    season: 'Zaid',
    crop: 'Moong',
    tips: 'Use disease-resistant varieties and ensure proper spacing. Avoid water logging and conduct pest monitoring every week. Harvest at proper pod maturity.'
  },
  {
    season: 'Kharif',
    crop: 'Cotton',
    tips: 'Select Bt cotton for better yield. Ensure proper row spacing and intercultural operations. Monitor for bollworm and whitefly infestation and spray biopesticides as needed.'
  },
  {
    season: 'Rabi',
    crop: 'Mustard',
    tips: 'Opt for early sowing in October. Apply basal dose of fertilizers before sowing. Use sulfur-based fertilizers and control aphids with neem oil or recommended insecticides.'
  },
  {
    season: 'Zaid',
    crop: 'Watermelon',
    tips: 'Grow in sandy loam with good drainage. Maintain regular irrigation during fruit development. Use mulch and cover fruits with straw to prevent sunburn.'
  },
  {
    season: 'Kharif',
    crop: 'Maize',
    tips: 'Sow at onset of monsoon. Apply nitrogen in 3 splits and zinc sulfate if deficiency symptoms occur. Use pre-emergence herbicides for weed control.'
  },
  {
    season: 'Rabi',
    crop: 'Barley',
    tips: 'Choose suitable varieties for feed or malt. Apply potash in soils with low fertility. Monitor for leaf rust and powdery mildew during early growth.'
  },
  {
    season: 'Zaid',
    crop: 'Cucumber',
    tips: 'Provide trellising for vine support. Ensure frequent irrigation in sandy soils. Spray neem-based solutions to control beetles and downy mildew.'
  },
  {
    season: 'Kharif',
    crop: 'Soybean',
    tips: 'Ensure seed inoculation with Rhizobium. Maintain plant spacing to avoid competition. Monitor for leaf-eating caterpillars and apply biological control.'
  },
  {
    season: 'Rabi',
    crop: 'Gram (Chana)',
    tips: 'Use kabuli or desi varieties based on soil type. Avoid over-irrigation to reduce wilt incidence. Apply zinc sulfate if micronutrient deficiency is observed.'
  },
  {
    season: 'Zaid',
    crop: 'Pumpkin',
    tips: 'Prepare raised beds to avoid water stagnation. Use pheromone traps for fruit flies. Apply organic manure to improve soil structure and nutrient availability.'
  },
  {
    season: 'Kharif',
    crop: 'Groundnut',
    tips: 'Apply gypsum at 30–35 DAS for better pod formation. Perform earthing up and keep soil loose. Control leaf spot and collar rot with proper fungicide sprays.'
  },
  {
    season: 'Rabi',
    crop: 'Peas',
    tips: 'Sow early for better yields. Provide bamboo sticks for support in climbing types. Protect from powdery mildew and aphids using organic sprays.'
  },
  {
    season: 'Zaid',
    crop: 'Bitter Gourd',
    tips: 'Use neem oil and yellow sticky traps for pest control. Maintain 2–3 irrigations per week. Ensure hand pollination in early morning for better fruit set.'
  }
];



const CropAdvisory = () => {
    return (
        <div className="container my-4 fade-in">
            <h3 className="text-center mb-4 text-success fw-bold">Crop Suggestions</h3>
            <div className="row">
                {advisoryData.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card advisory-card h-100 shadow-lg border-success">
                            <div className="card-body">
                                <h5 className="card-title text-primary fw-semibold">{item.crop}</h5>
                                <h6 className="text-muted">({item.season})</h6>
                                <p className="card-text">{item.tips}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CropAdvisory;
