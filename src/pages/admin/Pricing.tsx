import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Plus, X, Check } from 'lucide-react';
import { useAdmin, PricingTier } from '@/contexts/AdminContext';
import { Switch } from '@/components/ui/switch';

export default function Pricing() {
  const { pricingTiers, savePricing, togglePricingActive } = useAdmin();
  const [editingPricingId, setEditingPricingId] = useState<string | null>(null);
  const [pricingForm, setPricingForm] = useState<PricingTier | null>(null);
  const [pricingFeatureInput, setPricingFeatureInput] = useState('');

  const handleEditPricing = (tier: PricingTier) => {
    setPricingForm({ ...tier });
    setEditingPricingId(tier.id);
  };

  const handleSavePricing = () => {
    if (!pricingForm) return;
    savePricing(pricingForm);
    setPricingForm(null);
    setEditingPricingId(null);
  };

  const addPricingFeature = () => {
    if (!pricingFeatureInput.trim() || !pricingForm) return;
    setPricingForm({
      ...pricingForm,
      features: [...pricingForm.features, pricingFeatureInput.trim()],
    });
    setPricingFeatureInput('');
  };

  const removePricingFeature = (index: number) => {
    if (!pricingForm) return;
    setPricingForm({
      ...pricingForm,
      features: pricingForm.features.filter((_, i) => i !== index),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-light mb-1">Pricing Plans</h1>
        <p className="text-muted-foreground text-xs md:text-sm">Customize your pricing tiers</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ scale: 1.01 }}
            className={`glass-card rounded-xl p-4 md:p-6 ${!tier.isActive ? 'opacity-50' : ''}`}
          >
            {editingPricingId === tier.id && pricingForm ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Plan Name</label>
                  <input
                    type="text"
                    value={pricingForm.name}
                    onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                    className="w-full px-3 py-2 glass rounded-lg text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Price (₹)</label>
                    <input
                      type="number"
                      value={pricingForm.price}
                      onChange={(e) => setPricingForm({ ...pricingForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 glass rounded-lg text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground">Pages</label>
                    <input
                      type="number"
                      value={pricingForm.pages}
                      onChange={(e) => setPricingForm({ ...pricingForm, pages: Number(e.target.value) })}
                      className="w-full px-3 py-2 glass rounded-lg text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <input
                    type="text"
                    value={pricingForm.description}
                    onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                    className="w-full px-3 py-2 glass rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Features</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pricingFeatureInput}
                      onChange={(e) => setPricingFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPricingFeature())}
                      placeholder="Add feature..."
                      className="flex-1 px-3 py-2 glass rounded-lg text-sm"
                    />
                    <button
                      onClick={addPricingFeature}
                      className="px-3 py-2 glass-button rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pricingForm.features.map((feature, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-1 glass text-xs rounded-full">
                        {feature}
                        <button onClick={() => removePricingFeature(i)} className="hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setPricingForm(null);
                      setEditingPricingId(null);
                    }}
                    className="px-3 py-2 glass-button rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePricing}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm flex items-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground">{tier.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={tier.isActive}
                      onCheckedChange={() => togglePricingActive(tier.id)}
                    />
                    <button
                      onClick={() => handleEditPricing(tier)}
                      className="p-1.5 glass-button rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  {tier.price > 0 ? (
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {tier.currency}{tier.price.toLocaleString('en-IN')}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        / {tier.pages} pages
                      </span>
                    </p>
                  ) : (
                    <p className="text-2xl md:text-3xl font-bold text-primary">Custom</p>
                  )}
                </div>
                
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
