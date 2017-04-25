# pod
Payment Ease: POS Transactions Simplified

### Mission Statement
Remove transaction pain and unnessesary costs in an open, fair, simple and clear flow.

### What is the Opportunity
- It's painful to sign up for a proper merchant account in a store
- Stripe is buggy/too small scale
- Merchant account doesn't blend with inventory

### User Stories

#### As a store owner I want to:
> Pay no more for POS transactions than I do currently

> Lower hardware/upgrade requirements and costs

> Lower employee costs associated with processing transactions

> Free up staff to focus on customer needs

> Simplify my accounting and customer records

#### As a customer I want:
> To pay no direct fees for use

> The ability to link my bank account and/or credit cards to simplify transactions

> A fast/simple sign up process and interface

> Nothing pushy

> The ability to leave my wallet at home

### Customer Experience

### User Experience 
```
- Visit a store
- Accept prompt to start interaction
- Scan items or transactions posted by store
- Purchase authorized/session closed upon exiting
```

### Techno Flow

##### Set Up:
1. Log details/verify
2. Set up geofence
  + Why use geofence:
    + Simplify user experience
    + Less set up/friction to complete a transaction

#### User:
1. Service worker prompts to start transaction
2. Transaction token produced
3. Token provides vendor with neccessary customer information, and logs transaction information
4. Scan products with barcode reader
5. Payment source is Authorized/Checked but not completed
6. Once the geo boundary is exited the transaction is completed.

### Legal
1. User and Customer identities are verified before app use
2. 
