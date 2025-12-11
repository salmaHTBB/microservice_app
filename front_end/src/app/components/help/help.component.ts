import { Component } from '@angular/core';

interface FAQItem {
  question: string;
  answer: string;
  expanded: boolean;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  activeSection: string = 'faq';
  searchQuery: string = '';

  faqs: FAQItem[] = [
    {
      question: 'How do I create a new customer?',
      answer: 'Navigate to the Customers page and click the "Add Customer" button. Fill in the customer details (name and email) and click Save.',
      expanded: false
    },
    {
      question: 'How do I add a new product?',
      answer: 'Go to the Products page, click "Add Product", enter the product name, price, and quantity, then click Save.',
      expanded: false
    },
    {
      question: 'How do I create a bill/invoice?',
      answer: 'From the Bills page, click "Create Bill". Select a customer, add products with quantities, and the system will automatically calculate totals. Click Save to create the bill.',
      expanded: false
    },
    {
      question: 'How do I print an invoice?',
      answer: 'Open a bill by clicking "View Details", then click the "Print" button. This will open a print-friendly version of the invoice.',
      expanded: false
    },
    {
      question: 'How do I search for customers or products?',
      answer: 'Use the search bar at the top of the Customers or Products page. Type the name and the results will filter automatically.',
      expanded: false
    },
    {
      question: 'What does the dashboard show?',
      answer: 'The dashboard displays key statistics including total customers, products, bills, and revenue. It also shows recent bills and low stock alerts.',
      expanded: false
    },
    {
      question: 'How do I delete a customer or product?',
      answer: 'Click the delete (trash) icon next to the item you want to remove. Confirm the deletion when prompted.',
      expanded: false
    },
    {
      question: 'Can I edit existing records?',
      answer: 'Yes! Click the edit (pencil) icon next to any customer or product to modify their information.',
      expanded: false
    },
    {
      question: 'What is the tax rate?',
      answer: 'The default tax rate is 20%. You can change this in the Settings page under General Settings.',
      expanded: false
    },
    {
      question: 'How do I change the company information?',
      answer: 'Go to Settings > Company Info tab and update your company name, email, phone, and address. This information appears on invoices.',
      expanded: false
    }
  ];

  videoTutorials = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of navigating the application',
      duration: '5:30',
      icon: '🎬'
    },
    {
      title: 'Managing Customers',
      description: 'How to add, edit, and delete customers',
      duration: '3:45',
      icon: '👥'
    },
    {
      title: 'Product Management',
      description: 'Managing your inventory and products',
      duration: '4:20',
      icon: '📦'
    },
    {
      title: 'Creating Bills',
      description: 'Complete guide to billing and invoicing',
      duration: '6:15',
      icon: '🧾'
    }
  ];

  quickLinks = [
    { title: 'User Guide', icon: '📖', description: 'Complete documentation' },
    { title: 'Video Tutorials', icon: '🎥', description: 'Watch step-by-step guides' },
    { title: 'Keyboard Shortcuts', icon: '⌨️', description: 'Work faster with shortcuts' },
    { title: 'Contact Support', icon: '📧', description: 'Get help from our team' },
    { title: 'API Documentation', icon: '🔌', description: 'For developers' },
    { title: 'Release Notes', icon: '📝', description: 'What\'s new' }
  ];

  shortcuts = [
    { keys: 'Ctrl + K', action: 'Quick search' },
    { keys: 'Ctrl + N', action: 'New customer' },
    { keys: 'Ctrl + P', action: 'New product' },
    { keys: 'Ctrl + B', action: 'New bill' },
    { keys: 'Ctrl + S', action: 'Save current form' },
    { keys: 'Esc', action: 'Close modal' }
  ];

  toggleFAQ(faq: FAQItem): void {
    faq.expanded = !faq.expanded;
  }

  setSection(section: string): void {
    this.activeSection = section;
  }

  get filteredFAQs(): FAQItem[] {
    if (!this.searchQuery) return this.faqs;
    const query = this.searchQuery.toLowerCase();
    return this.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  }

  openSupportEmail(): void {
    window.location.href = 'mailto:support@microcommerce.com?subject=Support Request';
  }

  openDocumentation(): void {
    window.open('/assets/docs/user-guide.pdf', '_blank');
  }
}
