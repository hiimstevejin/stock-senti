import bcrypt from "bcrypt";
import postgres from "postgres";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";

// Initialize PostgreSQL connection
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  max: 1, // Use a single connection for seeding
});

// Type-safe seed functions with transaction support
async function seedUsers(sqlInstance = sql) {
  try {
    await sqlInstance`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sqlInstance`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `;

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sqlInstance`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING
          RETURNING id
        `;
      })
    );

    return insertedUsers.filter(Boolean);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCustomers(sqlInstance = sql) {
  try {
    await sqlInstance`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sqlInstance`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      )
    `;

    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => sqlInstance`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING
        RETURNING id
      `
      )
    );

    return insertedCustomers.filter(Boolean);
  } catch (error) {
    console.error("Error seeding customers:", error);
    throw error;
  }
}

async function seedInvoices(sqlInstance = sql) {
  try {
    await sqlInstance`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sqlInstance`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL REFERENCES customers(id),
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      )
    `;

    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => sqlInstance`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING
        RETURNING id
      `
      )
    );

    return insertedInvoices.filter(Boolean);
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedRevenue(sqlInstance = sql) {
  try {
    await sqlInstance`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      )
    `;

    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => sqlInstance`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING
        RETURNING month
      `
      )
    );

    return insertedRevenue.filter(Boolean);
  } catch (error) {
    console.error("Error seeding revenue:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const [users, customers, invoices, revenue] = await sql.begin(
      async (tx) => {
        // Execute in transaction with explicit order
        const users = await seedUsers(tx);
        const customers = await seedCustomers(tx);
        const invoices = await seedInvoices(tx);
        const revenue = await seedRevenue(tx);

        return [users, customers, invoices, revenue];
      }
    );

    return Response.json({
      success: true,
      stats: {
        users: users.length,
        customers: customers.length,
        invoices: invoices.length,
        revenue: revenue.length,
      },
      message: "Database seeded successfully",
    });
  } catch (error) {
    console.error("Seeding failed:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await sql.end(); // Clean up connection
  }
}
