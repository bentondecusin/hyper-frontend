import { Pool } from "pg";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const pool = new Pool({
    connectionString:
      "postgresql://root@127.0.0.1:26257/defaultdb?sslmode=disable",
  });
  const query = request.headers.get("qry");
  console.log(query);
  if (!query) return NextResponse.json({ success: false });
  try {
    const events: any = {};
    const client = await pool.connect();
    const res = await client.query(query);
    if (res.rows.length > 0) {
      const colnames = Object.keys(res.rows[0]);
      const rows = res.rows.map(Object.values);
      const df: any[] = rows[0].map((_, colIndex) =>
        rows.map((row) => row[colIndex])
      );
      colnames.forEach((row, idx) => {
        events[row] = df[idx];
      });
    }
    return NextResponse.json({
      success: true,
      props: { events: JSON.parse(JSON.stringify(events)) },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
  //   return NextResponse.json({ success: true, url: path });
}
