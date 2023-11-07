import { prisma } from "@/providers/PrismaProvider";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({});

        return NextResponse.json(products);
    } catch (error) {

        return NextResponse.json({ error: error }, { status: 500 });
    }

}
