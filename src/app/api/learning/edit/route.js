export async function POST(req) {
  const body = await req.json();
  const { title, description, part, date, senseiId, senseiName } = body;

  const newDate = new Date(date);

  const newLearning = await prisma.learning.create({
    data: {
      title: title,
      description: description,
      part: part,
      date: newDate.toISOString(),
      senseiId: senseiId,
      senseiName: senseiName,
      fileUrl: '',
    },
  });

  return NextResponse.json(newLearning);
}
