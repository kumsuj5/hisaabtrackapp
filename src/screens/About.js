import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Our App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>What is Our App?</Text>
        <Text style={styles.text}>
          Our app, Mera Hisaab, is a comprehensive solution designed for small business owners to easily manage their financial transactions, inventory, and customer records. Whether you are running a shop, a service-based business, or any small-scale operation, Mera Hisaab helps you keep track of everything in one place.
        </Text>

        <Text style={styles.sectionTitle}>Key Features</Text>
        <Text style={styles.text}>
          - **Business Management**: Manage multiple businesses with ease, track revenues, and monitor expenses.
        </Text>
        <Text style={styles.text}>
          - **Customer Management**: Keep a detailed record of your customers, including transaction history and outstanding payments.
        </Text>
        <Text style={styles.text}>
          - **Inventory Tracking**: Track stock levels, manage orders, and get notified when inventory is low.
        </Text>
        <Text style={styles.text}>
          - **Reports & Analytics**: Get insights into your business performance with detailed reports and analytics.
        </Text>
        <Text style={styles.text}>
          - **Offline Support**: Access and manage your data even when you're offline.
        </Text>

        <Text style={styles.sectionTitle}>Why Choose Mera Hisaab?</Text>
        <Text style={styles.text}>
          Our app is built with the needs of small business owners in mind. We aim to simplify accounting and inventory management by offering an intuitive, easy-to-use interface that saves time and reduces the hassle of managing financial records manually.
        </Text>

        <Text style={styles.text}>
          With Mera Hisaab, you can focus on growing your business while we handle the complexities of managing your accounts.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default About;
