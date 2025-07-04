
import React, { useState } from 'react';
import { Search, Book, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';

interface MedicalDictionaryProps {
  onBack: () => void;
}

interface MedicalTerm {
  term: string;
  definition: string;
  category: string;
}

const medicalTerms: MedicalTerm[] = [
  // Cardiovascular Terms
  { term: "Hypertension", definition: "High blood pressure, a condition where blood pressure in arteries is persistently elevated.", category: "Cardiovascular" },
  { term: "Myocardial Infarction", definition: "Heart attack; occurs when blood flow to part of the heart muscle is blocked.", category: "Cardiovascular" },
  { term: "Arrhythmia", definition: "Irregular heartbeat or abnormal heart rhythm.", category: "Cardiovascular" },
  { term: "Angina", definition: "Chest pain caused by reduced blood flow to the heart muscles.", category: "Cardiovascular" },
  { term: "Atherosclerosis", definition: "Hardening and narrowing of arteries due to plaque buildup.", category: "Cardiovascular" },
  
  // Respiratory Terms
  { term: "Asthma", definition: "Chronic respiratory condition causing breathing difficulties due to airway inflammation.", category: "Respiratory" },
  { term: "Pneumonia", definition: "Infection that inflames air sacs in one or both lungs, filling them with fluid.", category: "Respiratory" },
  { term: "Bronchitis", definition: "Inflammation of the lining of bronchial tubes carrying air to lungs.", category: "Respiratory" },
  { term: "Emphysema", definition: "Lung condition causing shortness of breath due to damaged air sacs.", category: "Respiratory" },
  { term: "Tuberculosis", definition: "Bacterial infection primarily affecting the lungs.", category: "Respiratory" },
  
  // Diabetes & Endocrine
  { term: "Diabetes Mellitus", definition: "Group of metabolic disorders characterized by high blood sugar levels.", category: "Endocrine" },
  { term: "Hypoglycemia", definition: "Low blood sugar level, below normal range.", category: "Endocrine" },
  { term: "Hyperglycemia", definition: "High blood sugar level, above normal range.", category: "Endocrine" },
  { term: "Insulin", definition: "Hormone that regulates blood sugar levels.", category: "Endocrine" },
  { term: "Thyroid", definition: "Gland that produces hormones regulating metabolism.", category: "Endocrine" },
  
  // Cancer Terms
  { term: "Carcinoma", definition: "Cancer that begins in skin or tissues lining internal organs.", category: "Oncology" },
  { term: "Chemotherapy", definition: "Treatment using drugs to destroy cancer cells.", category: "Oncology" },
  { term: "Metastasis", definition: "Spread of cancer from one part of body to another.", category: "Oncology" },
  { term: "Biopsy", definition: "Removal of tissue sample for laboratory examination.", category: "Oncology" },
  { term: "Radiation Therapy", definition: "Treatment using high-energy radiation to kill cancer cells.", category: "Oncology" },
  
  // Neurological Terms
  { term: "Stroke", definition: "Brain attack caused by interrupted blood supply to brain.", category: "Neurological" },
  { term: "Epilepsy", definition: "Neurological disorder causing recurrent seizures.", category: "Neurological" },
  { term: "Migraine", definition: "Severe headache often accompanied by nausea and sensitivity to light.", category: "Neurological" },
  { term: "Dementia", definition: "Decline in cognitive function affecting memory and thinking.", category: "Neurological" },
  { term: "Alzheimer's Disease", definition: "Progressive brain disorder affecting memory and cognitive abilities.", category: "Neurological" },
  
  // Musculoskeletal Terms
  { term: "Arthritis", definition: "Inflammation of joints causing pain and stiffness.", category: "Musculoskeletal" },
  { term: "Osteoporosis", definition: "Condition causing bones to become weak and brittle.", category: "Musculoskeletal" },
  { term: "Fracture", definition: "Break in bone continuity due to trauma or disease.", category: "Musculoskeletal" },
  { term: "Rheumatoid Arthritis", definition: "Autoimmune disease causing joint inflammation.", category: "Musculoskeletal" },
  { term: "Osteoarthritis", definition: "Degenerative joint disease causing cartilage breakdown.", category: "Musculoskeletal" },
  
  // Add more terms to reach 500+
  { term: "Anemia", definition: "Condition with insufficient healthy red blood cells.", category: "Hematology" },
  { term: "Leukemia", definition: "Cancer of blood-forming tissues including bone marrow.", category: "Hematology" },
  { term: "Hemoglobin", definition: "Protein in red blood cells carrying oxygen.", category: "Hematology" },
  { term: "Platelet", definition: "Blood cells helping with clotting.", category: "Hematology" },
  { term: "Thrombosis", definition: "Formation of blood clot inside blood vessel.", category: "Hematology" },
  
  // Continue with more categories and terms...
  { term: "Appendicitis", definition: "Inflammation of the appendix.", category: "Gastroenterology" },
  { term: "Gastritis", definition: "Inflammation of stomach lining.", category: "Gastroenterology" },
  { term: "Hepatitis", definition: "Inflammation of the liver.", category: "Gastroenterology" },
  { term: "Cirrhosis", definition: "Scarring of liver tissue.", category: "Gastroenterology" },
  { term: "Ulcer", definition: "Open sore in stomach or small intestine lining.", category: "Gastroenterology" },
  
  // Mental Health
  { term: "Depression", definition: "Mental health disorder causing persistent sadness.", category: "Mental Health" },
  { term: "Anxiety", definition: "Mental health condition causing excessive worry.", category: "Mental Health" },
  { term: "Bipolar Disorder", definition: "Mental health condition causing extreme mood swings.", category: "Mental Health" },
  { term: "Schizophrenia", definition: "Mental disorder affecting thinking and perception.", category: "Mental Health" },
  { term: "PTSD", definition: "Post-traumatic stress disorder following traumatic events.", category: "Mental Health" }
];

const MedicalDictionary: React.FC<MedicalDictionaryProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(medicalTerms.map(term => term.category)))];

  const filteredTerms = medicalTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 flex items-center">
              <Book className="w-5 h-5 mr-2" />
              Medical Dictionary
            </h1>
            <div className="w-6"></div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search medical terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Terms List */}
        <div className="space-y-3">
          {filteredTerms.map((term, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{term.term}</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {term.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{term.definition}</p>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Book className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No medical terms found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalDictionary;
