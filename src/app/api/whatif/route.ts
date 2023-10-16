import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const Ac = request.headers.get("Ac");
  const c = request.headers.get("c");

  if (!Ac || !c) return NextResponse.json({ success: false });
  console.log(Ac, c);

  try {
    // TODO, not real backend. Sample output
    const events: any = {};
    if (Ac == "status") {
      if (c == "0.0") {
        events["updated"] = 0.5111459843104775 * 100;
      } else if (c == "3.0") {
        events["updated"] = 0.8803105959686593 * 100;
      }
    }
    return NextResponse.json({
      success: true,
      props: { hyper_result: JSON.parse(JSON.stringify(events)) },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
  //   return NextResponse.json({ success: true, url: path });
}
