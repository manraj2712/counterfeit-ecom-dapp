import { prisma } from "@/providers/PrismaProvider";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing product id" }, { status: 400 });
        }
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        return NextResponse.json(product);
    } catch (error) {

        return NextResponse.json({ error: error }, { status: 500 });
    }

}