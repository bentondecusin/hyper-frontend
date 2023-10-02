import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `./public/${file.name}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  let baseUrl = request.headers.get("host");
  const import_query = `IMPORT CSV DATA (${baseUrl}/public/${file.name});`;
  console.log(import_query);
  console.log(baseUrl);
  const res = await fetch("http:\\" + baseUrl + "/api/dbshim", {
    method: "POST",
    headers: {
      qry: import_query,
    },
  });
  console.log(res.json());
  console.log("res", res);
  // const reslt = res.text();
  return new NextResponse(
    "month,age,credit,installment_plans,credit_amount,number_of_credits,employment,purpose,sex,housing,residence_since,credit_history,property,foreign_worker,investment_as_income_percentage,people_liable_for,telephone,other_debtors,status,skill_level,savings\n6.0,1.0,1.0,2.0,1169.0,2.0,4.0,4.0,1.0,1.0,4.0,4.0,0.0,0.0,4.0,1.0,1.0,0.0,0.0,2.0,4.0\n48.0,0.0,2.0,2.0,5951.0,1.0,2.0,4.0,0.0,1.0,2.0,2.0,0.0,0.0,2.0,1.0,0.0,0.0,1.0,2.0,0.0\n12.0,1.0,1.0,2.0,2096.0,1.0,3.0,7.0,1.0,1.0,3.0,4.0,0.0,0.0,2.0,2.0,0.0,0.0,3.0,1.0,0.0\n42.0,1.0,1.0,2.0,7882.0,1.0,3.0,3.0,1.0,2.0,4.0,2.0,1.0,0.0,2.0,2.0,0.0,2.0,0.0,2.0,0.0"
  );
}
