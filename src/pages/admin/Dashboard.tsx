import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

export default function Dashboard() {
  const { stats, inquiries } = useAdmin();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div>
        <h1 className="text-xl md:text-2xl font-light mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-xs md:text-sm">Overview of your business metrics</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {[
          { label: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'text-primary' },
          { label: 'This Month', value: stats.thisMonthInquiries, icon: TrendingUp, color: 'text-success' },
          { label: 'In Progress', value: stats.inProgressProjects, icon: Clock, color: 'text-primary' },
          { label: 'Completed', value: stats.completedProjects, icon: Users, color: 'text-success' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-xl p-3 md:p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-xs truncate">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color} flex-shrink-0`} />
            </div>
            <p className="text-xl md:text-2xl font-light">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
        <motion.div whileHover={{ scale: 1.01 }} className="glass-card rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm">Total Sales Value</span>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl md:text-3xl font-light">₹{stats.totalSalesValue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground mt-1">From completed projects</p>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.01 }} className="glass-card rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-muted-foreground text-sm">Pipeline Value</span>
            <TrendingUp className="w-5 h-5 text-info" />
          </div>
          <p className="text-2xl md:text-3xl font-light">₹{stats.estimatedPipelineValue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-muted-foreground mt-1">Estimated from inquiries</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <div className="glass-card rounded-xl p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-light text-foreground">{stats.totalProjects}</p>
          <p className="text-xs text-muted-foreground">Total Projects</p>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-light text-success">{stats.liveProjects}</p>
          <p className="text-xs text-muted-foreground">Live Projects</p>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-light text-muted-foreground">{stats.hiddenProjects}</p>
          <p className="text-xs text-muted-foreground">Hidden</p>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 text-center">
          <p className="text-xl md:text-2xl font-light text-primary">{stats.inProgressProjects}</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-light">Recent Inquiries</h2>
          <button 
            onClick={() => navigate('/admin/inquiries')}
            className="text-sm text-primary hover:underline"
          >
            View All
          </button>
        </div>
        
        {inquiries.length === 0 ? (
          <p className="text-muted-foreground text-center py-6 text-sm">No inquiries yet</p>
        ) : (
          <div className="space-y-2">
            {inquiries.slice(-5).reverse().map((inquiry) => (
              <div 
                key={inquiry.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 glass rounded-lg gap-2"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{inquiry.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{inquiry.projectTypeLabel || inquiry.projectType}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
