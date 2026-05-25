const PDFDocument = require("pdfkit");
const pool = require("../config/db");
const path = require("path");

const downloadReport = async (req, res) => {const {

academic_year,
student_year,
semester_no,
branch,
section

}
=
req.query;

  try {

    const result =
await pool.query(

`
SELECT
f.faculty_name,
s.subject_name,
fb.ratings,

fb.academic_year,
fb.student_year,
fb.semester_no,
fb.branch,
fb.section

FROM feedback fb

JOIN faculty f
ON fb.faculty_id=f.id

JOIN subjects s
ON fb.subject_id=s.id



WHERE

($1::text IS NULL
OR fb.academic_year = $1)

AND

($2::int IS NULL
OR fb.student_year = $2::int)

AND

($3::int IS NULL
OR fb.semester_no = $3::int)

AND

($4::text IS NULL
OR fb.branch = $4)

AND

($5::text IS NULL
OR fb.section = $5)





`,

[
academic_year || null,
student_year || null,
semester_no || null,
branch || null,
section || null
]
);
const reportInfo =
result.rows[0] || {};

if(
result.rows.length === 0
){

return res
.status(404)
.json({

message:
"No feedback data found"
});
}


    const facultyMap = {};

    // PROCESS DATA
    result.rows.forEach((row) => {

      
let ratings = {};

try {

ratings = row.ratings || {};

if (
typeof ratings === "string"
) {

ratings =
JSON.parse(ratings);
}

}catch(err){

console.log(
"Invalid ratings JSON:",
row.ratings
);

ratings = {};
}






      const values =

Object.values(
ratings || {}
)
          .map(Number)
          .filter(
            (num) =>
              !isNaN(num) &&
              num > 0
          );

      if (values.length === 0)
        return;

      const avg =
        values.reduce(
          (a, b) => a + b,
          0
        ) / values.length;

      const key =
        `${row.faculty_name}-${row.subject_name}`;

      if (!facultyMap[key]) {

        facultyMap[key] = {

          faculty_name:
            row.faculty_name,

          subject_name:
            row.subject_name,

          total: 0,

          count: 0
        };
      }

      facultyMap[key].total += avg;
      facultyMap[key].count += 1;
    });


    // FINAL DATA
    const finalData =
      Object.values(facultyMap)
        .map((item) => ({

          faculty_name:
            item.faculty_name,

          subject_name:
            item.subject_name,

          average_score:
            (
              item.total /
              item.count
            ).toFixed(2),

          feedback_count:
            item.count

        }))
        .sort(
          (a, b) =>
            b.average_score -
            a.average_score
        );

//NEW ADDITION
const getDepartmentName =
(branch)=>{

if(!branch)
return "Department";

const dept =
branch
.toUpperCase()
.trim();

switch(dept){

case "CSE":
return
"Department of Computer Science & Engineering";

case "ECE":
return
"Department of Electronics & Communication Engineering";

case "EEE":
return
"Department of Electrical & Electronics Engineering";

case "ME":
return
"Department of Mechanical Engineering";

case "CIVIL":
return
"Department of Civil Engineering";

default:
return
`${dept} Department`;
}
};


console.log(
"Branch in Report:",
reportInfo.branch
);







    // CREATE PDF
    const doc =
      new PDFDocument({
        margin: 40,
        size: "A4"
      });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Faculty_Feedback_Report.pdf"'
    );

    doc.pipe(res);

    doc.font("Helvetica");

    // LOGO
    const logoPath =
      path.join(
        __dirname,
        "../assets/logo.png"
      );

    try {

      doc.image(
        logoPath,
        45,
        35,
        {
          width: 60
        }
      );

    } catch (err) {

      console.log(
        "Logo not found"
      );
    }


    // COLLEGE HEADER
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(
        "BONAM VENKATA CHALAMAYYA ENGINEERING COLLEGE",
        120,
        35,
        {
          width: 420,
          align: "center"
        }
      );

    doc
  .font("Helvetica")
  .fontSize(11)
  .text(
    getDepartmentName(
      reportInfo.branch
    ),
    120,
    75,
    {
      width: 420,
      align: "center"
    }
  );

    doc
      .fontSize(10)
      .text(
        "Faculty Feedback Analysis Report (NBA / NAAC / OBE)",
        120,
        92,
        {
          width: 420,
          align: "center"
        }
      );


    // LINE
    doc
      .moveTo(
        40,
        125
      )
      .lineTo(
        560,
        125
      )
      .stroke();


    // TITLE
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .text(
        "Faculty Ranking Report",
        0,
        145,
        {
          align: "center"
        }
      );

doc
.fontSize(11)
.font("Helvetica-Bold")

.text(
"Academic Year: ",
50,
175,
{
continued:true
}
)
.font("Helvetica")
.text(
reportInfo.academic_year || "-"
);


doc
.font("Helvetica-Bold")
.text(
"Branch: ",
300,
175,
{
continued:true
}
)
.font("Helvetica")
.text(
reportInfo.branch || "-"
);


doc
.font("Helvetica-Bold")
.text(
"Year: ",
50,
200,
{
continued:true
}
)
.font("Helvetica")
.text(
`${reportInfo.student_year || "-"} Year`
);


doc
.font("Helvetica-Bold")
.text(
"Semester: ",
250,
200,
{
continued:true
}
)
.font("Helvetica")
.text(
reportInfo.semester_no || "-"
);


doc
.font("Helvetica-Bold")
.text(
"Section: ",
420,
200,
{
continued:true
}
)
.font("Helvetica")
.text(
reportInfo.section || "-"
);

    // TABLE
    const tableTop = 235;
    const rowHeight = 30;

    const rankX = 50;
    const facultyX = 90;
    const subjectX = 260;
    const avgX = 410;
    const countX = 500;

    const widths = [
      40,
      170,
      150,
      90,
      60
    ];

    const columns = [
      rankX,
      facultyX,
      subjectX,
      avgX,
      countX
    ];


    // HEADER CELLS
    columns.forEach(
      (x, index) => {

        doc.rect(
          x,
          tableTop,
          widths[index],
          rowHeight
        ).stroke();
      }
    );


    // HEADER TEXT
    doc
      .font("Helvetica-Bold")
      .fontSize(11);

    doc.text(
      "Rank",
      rankX + 8,
      tableTop + 10
    );

    doc.text(
      "Faculty",
      facultyX + 50,
      tableTop + 10
    );

    doc.text(
      "Subject",
      subjectX + 40,
      tableTop + 10
    );

    doc.text(
      "Avg Score",
      avgX + 10,
      tableTop + 10
    );

    doc.text(
      "Count",
      countX + 10,
      tableTop + 10
    );


    // TABLE DATA
    let y =
      tableTop +
      rowHeight;

    doc.font("Helvetica");

    finalData.forEach(
      (item, index) => {

        columns.forEach(
          (x, i) => {

            doc.rect(
              x,
              y,
              widths[i],
              rowHeight
            ).stroke();
          }
        );

        doc.text(
          String(index + 1),
          rankX + 12,
          y + 10
        );

        doc.text(
          item.faculty_name,
          facultyX + 5,
          y + 10,
          {
            width: 160
          }
        );

        doc.text(
          item.subject_name,
          subjectX + 5,
          y + 10,
          {
            width: 140
          }
        );

        doc.text(
          item.average_score,
          avgX + 20,
          y + 10
        );

        doc.text(
          String(
            item.feedback_count
          ),
          countX + 18,
          y + 10
        );

        y += rowHeight;
      }
    );


    // FOOTER
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `Generated On: ${new Date().toLocaleString()}`,
        50,
        760
      );

    doc.end();

  } catch (error) {

    console.log(
      "PDF Error:",
      error
    );

    res.status(500).json({
      message:
        "Server Error"
    });
  }
};


module.exports = {

  downloadReport

};