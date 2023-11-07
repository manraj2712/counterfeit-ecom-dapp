// pages/api/createProduct.js
import { prisma } from "@/providers/PrismaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const {
    id,
    manufacturer,
    manufacturerName,
    name,
    price,
    image,
  } = json;
  try {
    const product = await prisma.product.create({
      data: {
        id,
        manufacturer,
        manufacturerName,
        name,
        price,
        readyForSale: false,
        status: "Manufactured",
        image,
      },
    });

    return NextResponse.json({ message: "Product created successfully", product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
};
