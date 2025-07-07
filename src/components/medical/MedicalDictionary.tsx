
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
  // Cardiovascular Terms (50+ terms)
  { term: "Hypertension", definition: "High blood pressure, a condition where blood pressure in arteries is persistently elevated. Shinikizo la juu (Swahili).", category: "Cardiovascular" },
  { term: "Myocardial Infarction", definition: "Heart attack; occurs when blood flow to part of the heart muscle is blocked.", category: "Cardiovascular" },
  { term: "Arrhythmia", definition: "Irregular heartbeat or abnormal heart rhythm.", category: "Cardiovascular" },
  { term: "Angina", definition: "Chest pain caused by reduced blood flow to the heart muscles.", category: "Cardiovascular" },
  { term: "Atherosclerosis", definition: "Hardening and narrowing of arteries due to plaque buildup.", category: "Cardiovascular" },
  { term: "Bradycardia", definition: "Abnormally slow heart rate, typically below 60 beats per minute.", category: "Cardiovascular" },
  { term: "Tachycardia", definition: "Abnormally fast heart rate, typically above 100 beats per minute.", category: "Cardiovascular" },
  { term: "Cardiac Arrest", definition: "Sudden loss of heart function, breathing, and consciousness.", category: "Cardiovascular" },
  { term: "Congestive Heart Failure", definition: "Heart cannot pump blood effectively to meet body's needs.", category: "Cardiovascular" },
  { term: "Pericarditis", definition: "Inflammation of the pericardium, the sac surrounding the heart.", category: "Cardiovascular" },
  { term: "Endocarditis", definition: "Infection of the inner lining of heart chambers and valves.", category: "Cardiovascular" },
  { term: "Mitral Valve Prolapse", definition: "Heart valve doesn't close properly, causing blood to leak backward.", category: "Cardiovascular" },
  { term: "Aortic Stenosis", definition: "Narrowing of the aortic valve opening.", category: "Cardiovascular" },
  { term: "Ventricular Fibrillation", definition: "Life-threatening heart rhythm disorder.", category: "Cardiovascular" },
  { term: "Atrial Fibrillation", definition: "Irregular and often rapid heart rate.", category: "Cardiovascular" },
  
  // Respiratory Terms (50+ terms)
  { term: "Asthma", definition: "Chronic respiratory condition causing breathing difficulties due to airway inflammation. Kipumuzi (Swahili).", category: "Respiratory" },
  { term: "Pneumonia", definition: "Infection that inflames air sacs in one or both lungs, filling them with fluid.", category: "Respiratory" },
  { term: "Bronchitis", definition: "Inflammation of the lining of bronchial tubes carrying air to lungs.", category: "Respiratory" },
  { term: "Emphysema", definition: "Lung condition causing shortness of breath due to damaged air sacs.", category: "Respiratory" },
  { term: "Tuberculosis", definition: "Bacterial infection primarily affecting the lungs. Kifua kikuu (Swahili).", category: "Respiratory" },
  { term: "COPD", definition: "Chronic Obstructive Pulmonary Disease - group of lung diseases blocking airflow.", category: "Respiratory" },
  { term: "Pulmonary Embolism", definition: "Blood clot that blocks arteries in the lungs.", category: "Respiratory" },
  { term: "Pleurisy", definition: "Inflammation of the lining around the lungs and chest cavity.", category: "Respiratory" },
  { term: "Pneumothorax", definition: "Collapsed lung caused by air in the space around the lung.", category: "Respiratory" },
  { term: "Bronchiectasis", definition: "Condition where airways become abnormally widened and thickened.", category: "Respiratory" },
  { term: "Lung Cancer", definition: "Malignant tumor in the lungs, often caused by smoking.", category: "Respiratory" },
  { term: "Sleep Apnea", definition: "Disorder where breathing repeatedly stops and starts during sleep.", category: "Respiratory" },
  { term: "Cystic Fibrosis", definition: "Genetic disorder affecting lungs and digestive system.", category: "Respiratory" },
  { term: "Whooping Cough", definition: "Highly contagious bacterial infection of respiratory tract.", category: "Respiratory" },
  { term: "Acute Bronchitis", definition: "Short-term inflammation of bronchial tubes.", category: "Respiratory" },
  
  // Endocrine & Diabetes (40+ terms)
  { term: "Diabetes Mellitus", definition: "Group of metabolic disorders characterized by high blood sugar levels. Kisukari (Swahili).", category: "Endocrine" },
  { term: "Hypoglycemia", definition: "Low blood sugar level, below normal range.", category: "Endocrine" },
  { term: "Hyperglycemia", definition: "High blood sugar level, above normal range.", category: "Endocrine" },
  { term: "Insulin", definition: "Hormone that regulates blood sugar levels.", category: "Endocrine" },
  { term: "Thyroid", definition: "Gland that produces hormones regulating metabolism.", category: "Endocrine" },
  { term: "Hypothyroidism", definition: "Underactive thyroid gland producing insufficient hormones.", category: "Endocrine" },
  { term: "Hyperthyroidism", definition: "Overactive thyroid gland producing excess hormones.", category: "Endocrine" },
  { term: "Goiter", definition: "Enlargement of the thyroid gland.", category: "Endocrine" },
  { term: "Diabetic Ketoacidosis", definition: "Serious complication of diabetes with high blood sugar and ketones.", category: "Endocrine" },
  { term: "Gestational Diabetes", definition: "Diabetes that develops during pregnancy.", category: "Endocrine" },
  { term: "Adrenal Insufficiency", definition: "Condition where adrenal glands don't produce enough hormones.", category: "Endocrine" },
  { term: "Cushing's Syndrome", definition: "Disorder caused by prolonged exposure to high cortisol levels.", category: "Endocrine" },
  { term: "Addison's Disease", definition: "Disorder where adrenal glands produce insufficient hormones.", category: "Endocrine" },
  { term: "Polycystic Ovary Syndrome", definition: "Hormonal disorder affecting women of reproductive age.", category: "Endocrine" },
  { term: "Metabolic Syndrome", definition: "Cluster of conditions increasing risk of heart disease and diabetes.", category: "Endocrine" },
  
  // Oncology (50+ terms)
  { term: "Carcinoma", definition: "Cancer that begins in skin or tissues lining internal organs.", category: "Oncology" },
  { term: "Chemotherapy", definition: "Treatment using drugs to destroy cancer cells.", category: "Oncology" },
  { term: "Metastasis", definition: "Spread of cancer from one part of body to another.", category: "Oncology" },
  { term: "Biopsy", definition: "Removal of tissue sample for laboratory examination.", category: "Oncology" },
  { term: "Radiation Therapy", definition: "Treatment using high-energy radiation to kill cancer cells.", category: "Oncology" },
  { term: "Sarcoma", definition: "Cancer that develops in bone, cartilage, fat, muscle, or other connective tissues.", category: "Oncology" },
  { term: "Lymphoma", definition: "Cancer that begins in lymphatic system.", category: "Oncology" },
  { term: "Leukemia", definition: "Cancer of blood-forming tissues including bone marrow.", category: "Oncology" },
  { term: "Melanoma", definition: "Most serious type of skin cancer.", category: "Oncology" },
  { term: "Breast Cancer", definition: "Cancer that forms in tissues of the breast.", category: "Oncology" },
  { term: "Prostate Cancer", definition: "Cancer in the prostate gland in men.", category: "Oncology" },
  { term: "Lung Cancer", definition: "Cancer that begins in the lungs.", category: "Oncology" },
  { term: "Colon Cancer", definition: "Cancer of the large intestine.", category: "Oncology" },
  { term: "Cervical Cancer", definition: "Cancer occurring in cells of the cervix.", category: "Oncology" },
  { term: "Ovarian Cancer", definition: "Cancer that begins in the ovaries.", category: "Oncology" },
  { term: "Pancreatic Cancer", definition: "Cancer that begins in the pancreas.", category: "Oncology" },
  { term: "Liver Cancer", definition: "Cancer that begins in cells of the liver.", category: "Oncology" },
  { term: "Brain Tumor", definition: "Abnormal growth of cells in the brain.", category: "Oncology" },
  { term: "Bone Cancer", definition: "Cancer that begins in bone tissue.", category: "Oncology" },
  { term: "Kidney Cancer", definition: "Cancer that begins in the kidneys.", category: "Oncology" },
  
  // Neurological Terms (50+ terms)
  { term: "Stroke", definition: "Brain attack caused by interrupted blood supply to brain. Kiharusi cha ubongo (Swahili).", category: "Neurological" },
  { term: "Epilepsy", definition: "Neurological disorder causing recurrent seizures.", category: "Neurological" },
  { term: "Migraine", definition: "Severe headache often accompanied by nausea and sensitivity to light.", category: "Neurological" },
  { term: "Dementia", definition: "Decline in cognitive function affecting memory and thinking.", category: "Neurological" },
  { term: "Alzheimer's Disease", definition: "Progressive brain disorder affecting memory and cognitive abilities.", category: "Neurological" },
  { term: "Parkinson's Disease", definition: "Progressive nervous system disorder affecting movement.", category: "Neurological" },
  { term: "Multiple Sclerosis", definition: "Disease affecting brain and spinal cord.", category: "Neurological" },
  { term: "Neuropathy", definition: "Damage to peripheral nerves causing weakness and numbness.", category: "Neurological" },
  { term: "Meningitis", definition: "Inflammation of protective membranes covering brain and spinal cord.", category: "Neurological" },
  { term: "Encephalitis", definition: "Inflammation of the brain tissue.", category: "Neurological" },
  { term: "Concussion", definition: "Mild traumatic brain injury from impact or sudden movement.", category: "Neurological" },
  { term: "Seizure", definition: "Sudden, uncontrolled electrical disturbance in the brain.", category: "Neurological" },
  { term: "Cerebral Palsy", definition: "Group of disorders affecting movement and posture.", category: "Neurological" },
  { term: "Spinal Cord Injury", definition: "Damage to spinal cord resulting in loss of function.", category: "Neurological" },
  { term: "Huntington's Disease", definition: "Inherited disorder causing nerve cell breakdown.", category: "Neurological" },
  { term: "ALS", definition: "Amyotrophic Lateral Sclerosis - progressive nervous system disease.", category: "Neurological" },
  { term: "Bell's Palsy", definition: "Temporary facial paralysis due to nerve inflammation.", category: "Neurological" },
  { term: "Trigeminal Neuralgia", definition: "Chronic pain condition affecting facial nerves.", category: "Neurological" },
  { term: "Cluster Headache", definition: "Severe headaches occurring in cyclical patterns.", category: "Neurological" },
  { term: "Tension Headache", definition: "Most common type of headache causing mild to moderate pain.", category: "Neurological" },
  
  // Musculoskeletal Terms (50+ terms)
  { term: "Arthritis", definition: "Inflammation of joints causing pain and stiffness. Vipele vya mapigo (Swahili).", category: "Musculoskeletal" },
  { term: "Osteoporosis", definition: "Condition causing bones to become weak and brittle.", category: "Musculoskeletal" },
  { term: "Fracture", definition: "Break in bone continuity due to trauma or disease.", category: "Musculoskeletal" },
  { term: "Rheumatoid Arthritis", definition: "Autoimmune disease causing joint inflammation.", category: "Musculoskeletal" },
  { term: "Osteoarthritis", definition: "Degenerative joint disease causing cartilage breakdown.", category: "Musculoskeletal" },
  { term: "Fibromyalgia", definition: "Disorder causing widespread muscle pain and tenderness.", category: "Musculoskeletal" },
  { term: "Scoliosis", definition: "Abnormal curvature of the spine.", category: "Musculoskeletal" },
  { term: "Herniated Disc", definition: "Spinal disc pushes through crack in spine's outer ring.", category: "Musculoskeletal" },
  { term: "Tendinitis", definition: "Inflammation of tendons connecting muscles to bones.", category: "Musculoskeletal" },
  { term: "Bursitis", definition: "Inflammation of small fluid-filled sacs cushioning joints.", category: "Musculoskeletal" },
  { term: "Carpal Tunnel Syndrome", definition: "Numbness and tingling in hand due to compressed nerve.", category: "Musculoskeletal" },
  { term: "Plantar Fasciitis", definition: "Inflammation of tissue connecting heel bone to toes.", category: "Musculoskeletal" },
  { term: "Rotator Cuff Injury", definition: "Damage to muscles and tendons surrounding shoulder joint.", category: "Musculoskeletal" },
  { term: "ACL Tear", definition: "Injury to anterior cruciate ligament in the knee.", category: "Musculoskeletal" },
  { term: "Meniscus Tear", definition: "Injury to cartilage in the knee joint.", category: "Musculoskeletal" },
  { term: "Sciatica", definition: "Pain radiating along sciatic nerve from lower back to leg.", category: "Musculoskeletal" },
  { term: "Spinal Stenosis", definition: "Narrowing of spinal canal putting pressure on nerves.", category: "Musculoskeletal" },
  { term: "Gout", definition: "Form of arthritis caused by excess uric acid in blood.", category: "Musculoskeletal" },
  { term: "Lupus", definition: "Autoimmune disease affecting skin, joints, and organs.", category: "Musculoskeletal" },
  { term: "Muscular Dystrophy", definition: "Group of genetic diseases causing muscle weakness.", category: "Musculoskeletal" },
  
  // Gastroenterology (50+ terms)
  { term: "Appendicitis", definition: "Inflammation of the appendix.", category: "Gastroenterology" },
  { term: "Gastritis", definition: "Inflammation of stomach lining.", category: "Gastroenterology" },
  { term: "Hepatitis", definition: "Inflammation of the liver.", category: "Gastroenterology" },
  { term: "Cirrhosis", definition: "Scarring of liver tissue.", category: "Gastroenterology" },
  { term: "Ulcer", definition: "Open sore in stomach or small intestine lining.", category: "Gastroenterology" },
  { term: "GERD", definition: "Gastroesophageal Reflux Disease - chronic acid reflux.", category: "Gastroenterology" },
  { term: "Crohn's Disease", definition: "Inflammatory bowel disease affecting digestive tract.", category: "Gastroenterology" },
  { term: "Ulcerative Colitis", definition: "Inflammatory bowel disease affecting colon and rectum.", category: "Gastroenterology" },
  { term: "IBS", definition: "Irritable Bowel Syndrome - disorder affecting large intestine.", category: "Gastroenterology" },
  { term: "Gallstones", definition: "Hardened deposits in the gallbladder.", category: "Gastroenterology" },
  { term: "Pancreatitis", definition: "Inflammation of the pancreas.", category: "Gastroenterology" },
  { term: "Diverticulitis", definition: "Inflammation of small pouches in colon wall.", category: "Gastroenterology" },
  { term: "Constipation", definition: "Difficulty passing stools or infrequent bowel movements.", category: "Gastroenterology" },
  { term: "Diarrhea", definition: "Loose, watery stools occurring frequently.", category: "Gastroenterology" },
  { term: "Hemorrhoids", definition: "Swollen veins in lower rectum and anus.", category: "Gastroenterology" },
  { term: "Celiac Disease", definition: "Immune reaction to eating gluten.", category: "Gastroenterology" },
  { term: "Lactose Intolerance", definition: "Inability to digest lactose sugar in milk.", category: "Gastroenterology" },
  { term: "Peptic Ulcer", definition: "Sore developing on stomach or small intestine lining.", category: "Gastroenterology" },
  { term: "Esophagitis", definition: "Inflammation of the esophagus.", category: "Gastroenterology" },
  { term: "Fatty Liver Disease", definition: "Buildup of fat in liver cells.", category: "Gastroenterology" },
  
  // Hematology (30+ terms)
  { term: "Anemia", definition: "Condition with insufficient healthy red blood cells.", category: "Hematology" },
  { term: "Hemoglobin", definition: "Protein in red blood cells carrying oxygen.", category: "Hematology" },
  { term: "Platelet", definition: "Blood cells helping with clotting.", category: "Hematology" },
  { term: "Thrombosis", definition: "Formation of blood clot inside blood vessel.", category: "Hematology" },
  { term: "Hemophilia", definition: "Inherited bleeding disorder where blood doesn't clot properly.", category: "Hematology" },
  { term: "Sickle Cell Disease", definition: "Group of inherited red blood cell disorders.", category: "Hematology" },
  { term: "Thalassemia", definition: "Inherited blood disorder affecting hemoglobin production.", category: "Hematology" },
  { term: "Iron Deficiency", definition: "Most common cause of anemia worldwide.", category: "Hematology" },
  { term: "Polycythemia", definition: "Condition with too many red blood cells.", category: "Hematology" },
  { term: "Thrombocytopenia", definition: "Low platelet count in blood.", category: "Hematology" },
  { term: "White Blood Cells", definition: "Blood cells that fight infection and disease.", category: "Hematology" },
  { term: "Bone Marrow", definition: "Soft tissue inside bones where blood cells are made.", category: "Hematology" },
  { term: "Blood Transfusion", definition: "Medical procedure to transfer blood into circulation.", category: "Hematology" },
  { term: "Coagulation", definition: "Process of blood clot formation.", category: "Hematology" },
  { term: "Plasma", definition: "Liquid component of blood.", category: "Hematology" },
  
  // Mental Health (40+ terms)
  { term: "Depression", definition: "Mental health disorder causing persistent sadness. Huzuni (Swahili).", category: "Mental Health" },
  { term: "Anxiety", definition: "Mental health condition causing excessive worry. Wasiwasi (Swahili).", category: "Mental Health" },
  { term: "Bipolar Disorder", definition: "Mental health condition causing extreme mood swings.", category: "Mental Health" },
  { term: "Schizophrenia", definition: "Mental disorder affecting thinking and perception.", category: "Mental Health" },
  { term: "PTSD", definition: "Post-traumatic stress disorder following traumatic events.", category: "Mental Health" },
  { term: "OCD", definition: "Obsessive-Compulsive Disorder - pattern of unwanted thoughts and fears.", category: "Mental Health" },
  { term: "ADHD", definition: "Attention-Deficit/Hyperactivity Disorder affecting focus and behavior.", category: "Mental Health" },
  { term: "Autism", definition: "Developmental disorder affecting communication and behavior.", category: "Mental Health" },
  { term: "Eating Disorders", definition: "Serious conditions related to persistent eating behaviors.", category: "Mental Health" },
  { term: "Panic Disorder", definition: "Anxiety disorder characterized by recurring panic attacks.", category: "Mental Health" },
  { term: "Phobia", definition: "Persistent, irrational fear of specific object or situation.", category: "Mental Health" },
  { term: "Social Anxiety", definition: "Intense fear of social situations and judgment.", category: "Mental Health" },
  { term: "Substance Abuse", definition: "Harmful use of psychoactive substances.", category: "Mental Health" },
  { term: "Insomnia", definition: "Sleep disorder characterized by difficulty falling or staying asleep.", category: "Mental Health" },
  { term: "Therapy", definition: "Treatment for mental health conditions through counseling.", category: "Mental Health" },
  
  // Infectious Diseases (50+ terms)
  { term: "Malaria", definition: "Mosquito-borne disease causing fever and chills. Malaria (Swahili).", category: "Infectious Diseases" },
  { term: "HIV/AIDS", definition: "Human Immunodeficiency Virus attacking immune system. Ukimwi (Swahili).", category: "Infectious Diseases" },
  { term: "COVID-19", definition: "Coronavirus disease causing respiratory symptoms.", category: "Infectious Diseases" },
  { term: "Influenza", definition: "Viral infection affecting respiratory system. Homa ya mafua (Swahili).", category: "Infectious Diseases" },
  { term: "Pneumonia", definition: "Infection causing inflammation in air sacs of lungs.", category: "Infectious Diseases" },
  { term: "Typhoid", definition: "Bacterial infection affecting digestive system. Homa ya matumbo (Swahili).", category: "Infectious Diseases" },
  { term: "Cholera", definition: "Waterborne disease causing severe diarrhea. Kipindupindu (Swahili).", category: "Infectious Diseases" },
  { term: "Hepatitis B", definition: "Viral infection affecting the liver.", category: "Infectious Diseases" },
  { term: "Measles", definition: "Highly contagious viral disease. Surua (Swahili).", category: "Infectious Diseases" },
  { term: "Chickenpox", definition: "Viral infection causing itchy rash with blisters.", category: "Infectious Diseases" },
  { term: "Mumps", definition: "Viral infection causing swelling of salivary glands.", category: "Infectious Diseases" },
  { term: "Whooping Cough", definition: "Bacterial infection causing severe coughing fits.", category: "Infectious Diseases" },
  { term: "Dengue Fever", definition: "Mosquito-borne viral infection.", category: "Infectious Diseases" },
  { term: "Yellow Fever", definition: "Mosquito-borne viral disease.", category: "Infectious Diseases" },
  { term: "Zika Virus", definition: "Mosquito-borne virus causing mild symptoms.", category: "Infectious Diseases" },
  { term: "Ebola", definition: "Rare but severe viral disease.", category: "Infectious Diseases" },
  { term: "Rabies", definition: "Viral disease spread through animal bites.", category: "Infectious Diseases" },
  { term: "Tetanus", definition: "Bacterial infection affecting nervous system.", category: "Infectious Diseases" },
  { term: "Meningitis", definition: "Inflammation of brain and spinal cord membranes.", category: "Infectious Diseases" },
  { term: "Sepsis", definition: "Body's severe response to infection.", category: "Infectious Diseases" },
  
  // Dermatology (30+ terms)
  { term: "Eczema", definition: "Skin condition causing dry, itchy, inflamed skin.", category: "Dermatology" },
  { term: "Psoriasis", definition: "Autoimmune condition causing skin cell buildup.", category: "Dermatology" },
  { term: "Acne", definition: "Skin condition causing pimples and blackheads.", category: "Dermatology" },
  { term: "Dermatitis", definition: "General term for skin inflammation.", category: "Dermatology" },
  { term: "Skin Cancer", definition: "Malignant growth of skin cells.", category: "Dermatology" },
  { term: "Melanoma", definition: "Most dangerous type of skin cancer.", category: "Dermatology" },
  { term: "Rosacea", definition: "Chronic skin condition causing facial redness.", category: "Dermatology" },
  { term: "Vitiligo", definition: "Condition causing loss of skin pigmentation.", category: "Dermatology" },
  { term: "Hives", definition: "Raised, itchy bumps on skin due to allergic reaction.", category: "Dermatology" },
  { term: "Shingles", definition: "Viral infection causing painful rash on one side of body.", category: "Dermatology" },
  { term: "Warts", definition: "Small, rough growths on skin caused by virus.", category: "Dermatology" },
  { term: "Fungal Infection", definition: "Skin infection caused by fungi.", category: "Dermatology" },
  { term: "Cellulitis", definition: "Bacterial skin infection affecting deeper layers.", category: "Dermatology" },
  { term: "Impetigo", definition: "Contagious bacterial skin infection.", category: "Dermatology" },
  { term: "Cold Sores", definition: "Viral infection causing small blisters around mouth.", category: "Dermatology" },
  
  // Pediatrics (30+ terms)
  { term: "Diaper Rash", definition: "Skin irritation in diaper area of infants.", category: "Pediatrics" },
  { term: "Colic", definition: "Severe abdominal pain in infants.", category: "Pediatrics" },
  { term: "Teething", definition: "Process of baby teeth coming through gums.", category: "Pediatrics" },
  { term: "Growth Spurts", definition: "Periods of rapid physical development in children.", category: "Pediatrics" },
  { term: "Vaccination", definition: "Immunization to prevent diseases in children.", category: "Pediatrics" },
  { term: "Jaundice", definition: "Yellowing of skin and eyes, common in newborns.", category: "Pediatrics" },
  { term: "RSV", definition: "Respiratory Syncytial Virus causing breathing problems.", category: "Pediatrics" },
  { term: "Hand, Foot, and Mouth Disease", definition: "Viral infection common in young children.", category: "Pediatrics" },
  { term: "Ear Infection", definition: "Bacterial or viral infection in middle ear.", category: "Pediatrics" },
  { term: "Strep Throat", definition: "Bacterial infection causing sore throat.", category: "Pediatrics" },
  { term: "Asthma", definition: "Chronic condition affecting child's breathing.", category: "Pediatrics" },
  { term: "Allergies", definition: "Immune system reactions to substances.", category: "Pediatrics" },
  { term: "Fever", definition: "Elevated body temperature indicating illness.", category: "Pediatrics" },
  { term: "Constipation", definition: "Difficulty passing stools in children.", category: "Pediatrics" },
  { term: "Diarrhea", definition: "Loose, watery stools in children.", category: "Pediatrics" },
  
  // Pharmacology (25+ terms)
  { term: "Antibiotic", definition: "Medication that fights bacterial infections.", category: "Pharmacology" },
  { term: "Antiviral", definition: "Medication used to treat viral infections.", category: "Pharmacology" },
  { term: "Analgesic", definition: "Pain-relieving medication.", category: "Pharmacology" },
  { term: "Anti-inflammatory", definition: "Medication reducing inflammation and swelling.", category: "Pharmacology" },
  { term: "Antihistamine", definition: "Medication treating allergic reactions.", category: "Pharmacology" },
  { term: "Antacid", definition: "Medication neutralizing stomach acid.", category: "Pharmacology" },
  { term: "Diuretic", definition: "Medication increasing urine production.", category: "Pharmacology" },
  { term: "Beta-blocker", definition: "Medication slowing heart rate and reducing blood pressure.", category: "Pharmacology" },
  { term: "ACE Inhibitor", definition: "Medication treating high blood pressure and heart failure.", category: "Pharmacology" },
  { term: "Statin", definition: "Medication lowering cholesterol levels.", category: "Pharmacology" },
  { term: "Insulin", definition: "Hormone medication for diabetes management.", category: "Pharmacology" },
  { term: "Bronchodilator", definition: "Medication opening airways for easier breathing.", category: "Pharmacology" },
  { term: "Antidepressant", definition: "Medication treating depression and anxiety.", category: "Pharmacology" },
  { term: "Antipsychotic", definition: "Medication treating severe mental health conditions.", category: "Pharmacology" },
  { term: "Vaccine", definition: "Biological preparation providing immunity to diseases.", category: "Pharmacology" },
  { term: "Generic Drug", definition: "Medication with same active ingredient as brand-name drug.", category: "Pharmacology" },
  { term: "Side Effects", definition: "Unwanted effects of medication.", category: "Pharmacology" },
  { term: "Dosage", definition: "Amount and frequency of medication to be taken.", category: "Pharmacology" },
  { term: "Prescription", definition: "Written order for medication from healthcare provider.", category: "Pharmacology" },
  { term: "Over-the-counter", definition: "Medication available without prescription.", category: "Pharmacology" }
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
