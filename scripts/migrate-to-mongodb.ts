import clientPromise from '../lib/mongodb';

async function migrateToMongoDB() {
  try {
    console.log('🚀 Starting MongoDB migration...');

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'spacokebola');

    // Create indexes for better performance
    console.log('📊 Creating indexes...');

    // Index for allowed_emails collection
    await db.collection('allowed_emails').createIndex({ email: 1 }, { unique: true });
    console.log('✅ Created unique index on allowed_emails.email');

    // Index for announcements collection
    await db.collection('announcements').createIndex({ date: -1 });
    await db.collection('announcements').createIndex({ category: 1 });
    console.log('✅ Created indexes on announcements.date and announcements.category');

    // Add some initial allowed emails if the collection is empty
    const allowedEmailsCount = await db.collection('allowed_emails').countDocuments();
    if (allowedEmailsCount === 0) {
      console.log('📧 Adding initial allowed emails...');
      await db.collection('allowed_emails').insertMany([
        { email: 'blessedmarcel1@gmail.com', created_at: new Date(), updated_at: new Date() },
        // Add more emails as needed
      ]);
      console.log('✅ Added initial allowed emails');
    } else {
      console.log(`📧 Found ${allowedEmailsCount} existing allowed emails`);
    }

    // Add a sample announcement if the collection is empty
    const announcementsCount = await db.collection('announcements').countDocuments();
    if (announcementsCount === 0) {
      console.log('📢 Adding sample announcement...');
      await db.collection('announcements').insertOne({
        title: 'Welcome to SPAC Okebola',
        date: new Date().toISOString().split('T')[0],
        category: 'General',
        excerpt: 'Welcome to our new website!',
        content: 'This is a sample announcement to get you started.',
        created_at: new Date(),
        updated_at: new Date()
      });
      console.log('✅ Added sample announcement');
    } else {
      console.log(`📢 Found ${announcementsCount} existing announcements`);
    }

    console.log('🎉 MongoDB migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Set your MONGODB_URI in .env.local');
    console.log('2. Set your MONGODB_DB name in .env.local');
    console.log('3. Test your application');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateToMongoDB();
}

export { migrateToMongoDB };
