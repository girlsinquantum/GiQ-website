export type Resource = {
  title: string;
  category: "Course" | "Game" | "Video" | "Book" | "Tool" | "Article" | "Community";
  link: string;
  tags?: string[];
};

export const resources: Resource[] = [
  // --- GAMES ---
  { title: "Quantum Applications Card Games", category: "Game", link: "https://quantumforgood.eu/resources/lets-play-the-quantum-applications-card-game-manual/" },
  { title: "Quantum Tetris", category: "Game", link: "https://olivierbrcknr.github.io/quantum-tetris/" },
  { title: "|Hop> <Quantum Game|", category: "Game", link: "https://www.hopquantumgame.com/" },
  { title: "The Qubit Game", category: "Game", link: "https://quantumai.google/education/thequbitgame" },
  { title: "Quantum Moves 2", category: "Game", link: "https://www.scienceathome.org/games/quantum-moves-2/" },
  { title: "Quantum Chess", category: "Game", link: "https://quantumchess.net/" },
  { title: "Quantum Physics Puzzle Game", category: "Game", link: "https://www.mathsisfun.com/games/quantum.html" },
  { title: "Quantum Odyssey", category: "Game", link: "https://store.steampowered.com/app/2802710/Quantum_Odyssey/" },
  { title: "Psi and Delta", category: "Game", link: "https://learnqm.gatech.edu/" },
  { title: "The Photonic Trail", category: "Game", link: "https://qplaylearn.com/treasure-hunt" },
  { title: "Rydbergator", category: "Game", link: "https://scistarter.org/rydbergator/" },
  { title: "qCraft", category: "Game", link: "https://qcraft.org/" },
  { title: "Particle in a Box", category: "Game", link: "https://phet.colorado.edu/en/simulation/bound-states" },
  { title: "Virtual Quantum Optics Laboratory", category: "Game", link: "https://www.visual-quantum-physics.org/" },
  { title: "Quantum Pattern Matching", category: "Game", link: "https://www.quantumpatterns.com/" }, 
  { title: "Build an Atom", category: "Game", link: "https://phet.colorado.edu/en/simulation/build-an-atom" },

  // --- COURSES & ACADEMIES ---
  { title: "Qiskit Textbook", category: "Course", link: "https://qiskit.org/textbook" },
  { title: "Womanium & Wiser Quantum Program", category: "Course", link: "https://www.womanium.org/Quantum/PDE" },
  { title: "ScholarIQ Intro Course", category: "Course", link: "http://scholar-iq.org/" },
  { title: "IQM Academy", category: "Course", link: "https://www.iqmacademy.com/" },
  { title: "Qureka! Box", category: "Course", link: "https://qureca.com/qureka-box/" },
  { title: "Quantum Computing Foundations", category: "Course", link: "https://learn.microsoft.com/en-us/training/paths/quantum-computing-fundamentals/" },
  { title: "Quantum Katas", category: "Course", link: "https://github.com/microsoft/QuantumKatas" },
  { title: "QWorld", category: "Community", link: "https://qworld.net/" },
  { title: "Quantum Explorers", category: "Course", link: "https://qiskit.org/events/quantum-explorers/" },
  { title: "Understanding Quantum Information", category: "Course", link: "https://www.youtube.com/watch?v=F_Riqjdh2oM" },
  { title: "Introduction to Quantum Computing", category: "Course", link: "https://www.futurelearn.com/courses/intro-to-quantum-computing" },
  { title: "Foundations of Quantum Mechanics", category: "Course", link: "https://perimeterinstitute.ca/" },
  { title: "Quantum Optics 1: Single Photons", category: "Course", link: "https://www.coursera.org/learn/quantum-optics-single-photon" },
  { title: "Quantum Optics 2: Two Photons", category: "Course", link: "https://www.coursera.org/learn/quantum-optics-two-photon" },
  { title: "Dummies Guide to Practical Quantum", category: "Course", link: "https://medium.com/@qcgi/dummies-guide-to-practical-quantum-computing-with-ibm-qiskit-1-3-7b640061e892" },
  { title: "Q/QML Course", category: "Course", link: "https://pennylane.ai/qml/" },

  // --- VIDEOS & LECTURES ---
  { title: "John Young - Interview", category: "Video", link: "https://www.linkedin.com/in/john-young-mba-cissp-cism/" },
  { title: "Quantum Consciousness Series", category: "Video", link: "https://drive.google.com/file/d/1zrrplClnLZKeDRW4tLy62B3UryP4jxNz/view?usp=sharing" },
  { title: "Theoretical Minimum (Susskind)", category: "Video", link: "https://theoreticalminimum.com/" },
  { title: "Quantum Computing Revolution", category: "Video", link: "https://www.youtube.com/watch?v=qCM4qRNXvsQ" },
  { title: "The Map of Quantum Computing", category: "Video", link: "https://www.youtube.com/watch?v=-UlxHPIEVqA" },
  { title: "Quantum Computers Explained", category: "Video", link: "https://www.youtube.com/watch?v=JhHMJCUmq28" },
  { title: "The Einstein Lecture", category: "Video", link: "https://www.youtube.com/watch?v=8yU1QW6Q8eI" },
  { title: "The Double-Slit Experiment", category: "Video", link: "https://www.youtube.com/watch?v=A9tKnc_GccE" },
  { title: "How to Get Classical Physics from Quantum", category: "Video", link: "https://www.youtube.com/watch?v=2e6i4u71cKk" },
  { title: "The Challenge of Quantum Reality", category: "Video", link: "https://www.youtube.com/watch?v=wHqf94f9b8s" },
  { title: "Quantum Enigmas: Treasure Door", category: "Video", link: "https://www.youtube.com/watch?v=Xn1y6k7a8aM" },
  { title: "Quantum Enigmas: Statue Vandals", category: "Video", link: "https://www.youtube.com/watch?v=Q1y6k7a8aM" },
  { title: "Quantum Enigmas: Monty Hall", category: "Video", link: "https://www.youtube.com/watch?v=R1y6k7a8aM" },
  { title: "Quantum Enigmas: Four-Square Chess", category: "Video", link: "https://www.youtube.com/watch?v=S1y6k7a8aM" },
  { title: "Quantum Enigmas: Four Hair Colors", category: "Video", link: "https://www.youtube.com/watch?v=T1y6k7a8aM" },

  // --- REPOSITORIES & TOOLS ---
  { title: "Science with Serena", category: "Tool", link: "https://medium.com/@sciencewithserena" },
  { title: "Quantum Resources For All", category: "Tool", link: "https://docs.google.com/document/d/14NpaezqbPknypNN-AqNBaCxKeG2mEI1nM3LvjXUC-xw/edit?usp=sharing" },
  { title: "Amazon Braket Algorithm Library", category: "Tool", link: "https://github.com/aws-samples/amazon-braket-algorithm-library" },
  { title: "Amazon Braket Examples", category: "Tool", link: "https://github.com/aws/amazon-braket-examples" },
  { title: "Microsoft Quantum Development Kit", category: "Tool", link: "https://github.com/microsoft/Quantum" },
  { title: "Azure Quantum Optimization Samples", category: "Tool", link: "https://github.com/microsoft/qio-samples" },
  { title: "PaddlePaddle Quantum", category: "Tool", link: "https://github.com/PaddlePaddle/Quantum" },
  { title: "Azure Quantum Documentation", category: "Tool", link: "https://learn.microsoft.com/en-us/azure/quantum/" },
  { title: "Awesome Quantum Computing", category: "Tool", link: "https://github.com/desireevl/awesome-quantum-computing" },
  { title: "IBM Quantum Composer", category: "Tool", link: "https://quantum-computing.ibm.com/composer" },
  { title: "QMap", category: "Tool", link: "https://qmap.io/" },

  // --- BOOKS & READING ---
  { title: "Quantum Computing through Geopolitics", category: "Book", link: "https://www.notion.so/girlsinquantum/Quantum-Computing-through-Geopolitics-c63e3b7b1bf042bcbb2e5182d7a745ad?pvs=4#0a01e184a65142d28cd594a6b92767d7" },
  { title: "Quantum Computing since Democritus", category: "Book", link: "https://www.amazon.com/Quantum-Computing-since-Democritus-Aaronson/dp/0521199565" },
  { title: "Quantum in Pictures", category: "Book", link: "https://www.amazon.com/Quantum-Pictures-New-Way-Understand/dp/1739214712" },
  { title: "Quantum Computing: A Gentle Introduction", category: "Book", link: "https://www.amazon.com/Quantum-Computing-Gentle-Introduction-Engineering/dp/0262015064" },
  { title: "Quantum Computation and Quantum Info", category: "Book", link: "https://www.amazon.com/Quantum-Computation-Information-10th-Anniversary/dp/1107002176" },
  { title: "Learn Quantum Computing with Python", category: "Book", link: "https://www.amazon.com/Learn-Quantum-Computing-Python-Experience/dp/1789805988" },
  { title: "Dancing with Qubits", category: "Book", link: "https://www.amazon.com/Dancing-Qubits-quantum-computing-change/dp/1838827366" },
  { title: "Picturing Quantum Processes", category: "Book", link: "https://www.amazon.com/Picturing-Quantum-Processes-Diagrammatic-Reasoning/dp/1107104224" },
  { title: "QxQ Reading Resource List", category: "Book", link: "https://www.qubitbyqubit.org/" },
  { title: "A Beginner's Guide to Quantum Computing", category: "Article", link: "https://shor.com" },
  { title: "Quantum Chemistry and Computing", category: "Article", link: "https://link.springer.com/" },
  { title: "Quantum Gravity and Paradoxes", category: "Article", link: "https://www.quantamagazine.org/" },
  { title: "The Quantum Advantage", category: "Article", link: "https://www.ibm.com/thought-leadership/institute-business-value/report/quantum-advantage" },
  { title: "Quantum Natural Language Processing", category: "Article", link: "https://medium.com/cambridge-quantum-computing/quantum-natural-language-processing-748d6f27b31d" },
  { title: "Learn from a Condensed Matter Expert", category: "Article", link: "https://physics.aps.org/" },
  { title: "Learning Cloud Quantum Programming", category: "Article", link: "https://cloud.google.com/quantum" },
  { title: "Quantum Neural Networks", category: "Article", link: "https://arxiv.org/abs/1802.06002" },
  { title: "iFIX-IT", category: "Article", link: "https://ifixit.com" },
  { title: "The Quantum Mechanics Visualization", category: "Tool", link: "https://madebyevan.com/webgl-path-tracing/" }
];