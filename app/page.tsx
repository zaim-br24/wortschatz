"use client";
import { useState, useEffect } from "react";

type Word = {
  german: string;
  meaning: string;
  translation: string;
  example1: string;
  example2: string;
  sentenceTranslation1: string;
  sentenceTranslation2: string;
  type: "noun" | "verb" | "adjective" | "adverb";
};
type Colors = {
  noun: string;
  verb: string;
  adjective: string;
  adverb: string;
};

const words: Word[] = [
  {
    german: "die Bedingung",
    meaning: "eine Voraussetzung oder ein Umstand",
    translation: "condition",
    example1: "Unter diesen Bedingungen kann ich nicht arbeiten.",
    sentenceTranslation1: "I cannot work under these conditions.",
    example2: "Die Bedingungen des Vertrags sind klar.",
    sentenceTranslation2: "The conditions of the contract are clear.",
    type: "noun",
  },
  {
    german: "die Ebene",
    meaning: "ein Niveau oder eine Stufe",
    translation: "level/plane",
    example1: "Wir müssen das Problem auf einer höheren Ebene diskutieren.",
    sentenceTranslation1: "We need to discuss the problem at a higher level.",
    example2: "Das Flugzeug flog in großer Höhe auf dieser Ebene.",
    sentenceTranslation2: "The plane flew at a high altitude on this plane.",
    type: "noun",
  },
  {
    german: "die Gesellschaft",
    meaning:
      "die Gesamtheit der Menschen, die in einem bestimmten Gebiet leben",
    translation: "society",
    example1: "Die Gesellschaft verändert sich ständig.",
    sentenceTranslation1: "Society is constantly changing.",
    example2: "Er engagiert sich für die Gesellschaft.",
    sentenceTranslation2: "He is committed to society.",
    type: "noun",
  },
  {
    german: "die Quelle",
    meaning: "der Ursprung oder die Herkunft von etwas",
    translation: "source",
    example1: "Die Quelle des Flusses liegt in den Bergen.",
    sentenceTranslation1: "The source of the river is in the mountains.",
    example2: "Die Informationen stammen aus zuverlässiger Quelle.",
    sentenceTranslation2: "The information comes from a reliable source.",
    type: "noun",
  },
  {
    german: "die Tendenz",
    meaning: "die Neigung zu einer bestimmten Entwicklung",
    translation: "tendency",
    example1: "Es gibt eine Tendenz zu steigenden Preisen.",
    sentenceTranslation1: "There is a tendency towards rising prices.",
    example2: "Er hat die Tendenz, zu spät zu kommen.",
    sentenceTranslation2: "He has a tendency to be late.",
    type: "noun",
  },
  {
    german: "anspruchsvoll",
    meaning: "hohe Anforderungen stellend, schwierig",
    translation: "demanding/challenging",
    example1: "Das Projekt ist sehr anspruchsvoll.",
    sentenceTranslation1: "The project is very demanding.",
    example2: "Sie hat einen anspruchsvollen Geschmack.",
    sentenceTranslation2: "She has demanding tastes.",
    type: "adjective",
  },
  {
    german: "bedeutend",
    meaning: "wichtig, erheblich",
    translation: "significant/important",
    example1: "Das ist ein bedeutender Fortschritt.",
    sentenceTranslation1: "This is a significant progress.",
    example2: "Er spielte eine bedeutende Rolle.",
    sentenceTranslation2: "He played a significant role.",
    type: "adjective",
  },
  {
    german: "komplex",
    meaning: "vielschichtig, schwierig zu verstehen",
    translation: "complex",
    example1: "Das Thema ist sehr komplex.",
    sentenceTranslation1: "The topic is very complex.",
    example2: "Es handelt sich um ein komplexes Problem.",
    sentenceTranslation2: "It is a complex problem.",
    type: "adjective",
  },
  {
    german: "relevant",
    meaning: "von Bedeutung, wichtig für den Zusammenhang",
    translation: "relevant",
    example1: "Diese Information ist für uns relevant.",
    sentenceTranslation1: "This information is relevant to us.",
    example2: "Das ist nicht relevant für die Diskussion.",
    sentenceTranslation2: "That is not relevant to the discussion.",
    type: "adjective",
  },
  {
    german: "verfügen über",
    meaning: "etwas besitzen, zur Verfügung haben",
    translation: "to have at one's disposal/to possess",
    example1: "Das Unternehmen verfügt über moderne Technologien.",
    sentenceTranslation1:
      "The company has modern technologies at its disposal.",
    example2: "Er verfügt über umfangreiche Kenntnisse.",
    sentenceTranslation2: "He possesses extensive knowledge.",
    type: "verb",
  },
  {
    german: "berücksichtigen",
    meaning: "etwas in Betracht ziehen, beachten",
    translation: "to consider/to take into account",
    example1: "Wir müssen alle Faktoren berücksichtigen.",
    sentenceTranslation1: "We must consider all factors.",
    example2: "Bitte berücksichtigen Sie die Frist.",
    sentenceTranslation2: "Please take the deadline into account.",
    type: "verb",
  },
  {
    german: "entwickeln",
    meaning: "etwas weiterentwickeln, entstehen lassen",
    translation: "to develop",
    example1: "Die Firma entwickelt neue Produkte.",
    sentenceTranslation1: "The company is developing new products.",
    example2: "Die Technologie entwickelt sich schnell.",
    sentenceTranslation2: "The technology is developing rapidly.",
    type: "verb",
  },
  {
    german: "erweitern",
    meaning: "vergrößern, ausdehnen",
    translation: "to expand/to broaden",
    example1: "Das Unternehmen möchte seine Marktanteile erweitern.",
    sentenceTranslation1: "The company wants to expand its market share.",
    example2: "Wir müssen unseren Horizont erweitern.",
    sentenceTranslation2: "We need to broaden our horizons.",
    type: "verb",
  },
  {
    german: "fördern",
    meaning: "unterstützen, vorantreiben",
    translation: "to promote/to support",
    example1: "Die Regierung fördert die Forschung.",
    sentenceTranslation1: "The government promotes research.",
    example2: "Wir müssen die Zusammenarbeit fördern.",
    sentenceTranslation2: "We must support the collaboration.",
    type: "verb",
  },
  {
    german: "gestalten",
    meaning: "formen, gestalten, entwerfen",
    translation: "to shape/to design",
    example1: "Wir müssen die Zukunft gestalten.",
    sentenceTranslation1: "We must shape the future.",
    example2: "Er hat das Projekt gestaltet.",
    sentenceTranslation2: "He designed the project.",
    type: "verb",
  },
  {
    german: "verbessern",
    meaning: "etwas besser machen",
    translation: "to improve",
    example1: "Wir müssen die Qualität verbessern.",
    sentenceTranslation1: "We must improve the quality.",
    example2: "Er möchte seine Sprachkenntnisse verbessern.",
    sentenceTranslation2: "He wants to improve his language skills.",
    type: "verb",
  },
  {
    german: "verhindern",
    meaning: "etwas vermeiden, dafür sorgen, dass etwas nicht passiert",
    translation: "to prevent",
    example1: "Wir müssen Unfälle verhindern.",
    sentenceTranslation1: "We must prevent accidents.",
    example2: "Die Maßnahmen sollen die Ausbreitung der Krankheit verhindern.",
    sentenceTranslation2:
      "The measures are intended to prevent the spread of the disease.",
    type: "verb",
  },
  {
    german: "die Neugier",
    meaning: "der Wunsch, Neues zu erfahren",
    translation: "curiosity",
    example1: "Ihre Neugier war geweckt.",
    sentenceTranslation1: "Her curiosity was piqued.",
    example2: "Kinder haben viel Neugier.",
    sentenceTranslation2: "Children have a lot of curiosity.",
    type: "noun",
  },
  {
    german: "die Möglichkeit",
    meaning: "eine Chance oder Option",
    translation: "possibility/opportunity",
    example1: "Es gibt viele Möglichkeiten.",
    sentenceTranslation1: "There are many possibilities.",
    example2: "Nutze diese Möglichkeit!",
    sentenceTranslation2: "Seize this opportunity!",
    type: "noun",
  },
  {
    german: "die Unterstützung",
    meaning: "Hilfe oder Beistand",
    translation: "support",
    example1: "Ich brauche deine Unterstützung.",
    sentenceTranslation1: "I need your support.",
    example2: "Vielen Dank für die Unterstützung!",
    sentenceTranslation2: "Thank you for the support!",
    type: "noun",
  },
  {
    german: "die Veränderung",
    meaning: "ein Wechsel oder eine Umwandlung",
    translation: "change",
    example1: "Es gibt große Veränderungen.",
    sentenceTranslation1: "There are big changes.",
    example2: "Ich brauche eine Veränderung.",
    sentenceTranslation2: "I need a change.",
    type: "noun",
  },
  {
    german: "die Zukunft",
    meaning: "die Zeit, die noch kommt",
    translation: "future",
    example1: "Was bringt die Zukunft?",
    sentenceTranslation1: "What does the future hold?",
    example2: "Ich plane für die Zukunft.",
    sentenceTranslation2: "I'm planning for the future.",
    type: "noun",
  },
  {
    german: "erfolgreich",
    meaning: "mit Erfolg",
    translation: "successful",
    example1: "Er ist ein erfolgreicher Geschäftsmann.",
    sentenceTranslation1: "He is a successful businessman.",
    example2: "Sie hat das Examen erfolgreich bestanden.",
    sentenceTranslation2: "She successfully passed the exam.",
    type: "adjective",
  },
  {
    german: "fair",
    meaning: "gerecht, anständig",
    translation: "fair",
    example1: "Das ist nicht fair!",
    sentenceTranslation1: "That's not fair!",
    example2: "Wir wollen einen fairen Preis.",
    sentenceTranslation2: "We want a fair price.",
    type: "adjective",
  },
  {
    german: "gemeinsam",
    meaning: "zusammen mit anderen",
    translation: "together",
    example1: "Wir machen das gemeinsam.",
    sentenceTranslation1: "We'll do it together.",
    example2: "Sie haben gemeinsam gearbeitet.",
    sentenceTranslation2: "They worked together.",
    type: "adjective",
  },
  {
    german: "interessant",
    meaning: "fesselnd, spannend",
    translation: "interesting",
    example1: "Das Buch ist sehr interessant.",
    sentenceTranslation1: "The book is very interesting.",
    example2: "Die Geschichte klingt interessant.",
    sentenceTranslation2: "The story sounds interesting.",
    type: "adjective",
  },
  {
    german: "kompliziert",
    meaning: "schwer zu verstehen oder zu handhaben",
    translation: "complicated",
    example1: "Die Situation ist kompliziert.",
    sentenceTranslation1: "The situation is complicated.",
    example2: "Das ist eine komplizierte Frage.",
    sentenceTranslation2: "That's a complicated question.",
    type: "adjective",
  },
  {
    german: "die Auswirkung",
    meaning: "die Folge oder Konsequenz von etwas",
    translation: "impact/effect",
    example1: "Das hat große Auswirkungen.",
    sentenceTranslation1: "This has a big impact.",
    example2: "Welche Auswirkungen hat das?",
    sentenceTranslation2: "What effects does that have?",
    type: "noun",
  },
  {
    german: "der Fortschritt",
    meaning: "die Weiterentwicklung oder Verbesserung",
    translation: "progress",
    example1: "Wir machen Fortschritte.",
    sentenceTranslation1: "We are making progress.",
    example2: "Es gibt viel Fortschritt in der Technologie.",
    sentenceTranslation2: "There is a lot of progress in technology.",
    type: "noun",
  },
  {
    german: "der Kompromiss",
    meaning: "eine Einigung durch gegenseitiges Nachgeben",
    translation: "compromise",
    example1: "Wir müssen einen Kompromiss finden.",
    sentenceTranslation1: "We need to find a compromise.",
    example2: "Sie haben einen guten Kompromiss geschlossen.",
    sentenceTranslation2: "They reached a good compromise.",
    type: "noun",
  },
  {
    german: "die Konsequenz",
    meaning: "die Folge einer Handlung",
    translation: "consequence",
    example1: "Du musst die Konsequenzen tragen.",
    sentenceTranslation1: "You have to bear the consequences.",
    example2: "Das sind die Konsequenzen deines Handelns.",
    sentenceTranslation2: "These are the consequences of your actions.",
    type: "noun",
  },
  {
    german: "die Perspektive",
    meaning: "die Sichtweise oder der Standpunkt",
    translation: "perspective",
    example1: "Das ist meine Perspektive.",
    sentenceTranslation1: "That's my perspective.",
    example2: "Wir müssen die Perspektive wechseln.",
    sentenceTranslation2: "We need to change perspective.",
    type: "noun",
  },
  {
    german: "überraschend",
    meaning: "unerwartet",
    translation: "surprising",
    example1: "Das Ergebnis war überraschend.",
    sentenceTranslation1: "The result was surprising.",
    example2: "Es war eine überraschende Nachricht.",
    sentenceTranslation2: "It was a surprising message.",
    type: "adjective",
  },
  {
    german: "unglaublich",
    meaning: "kaum zu glauben",
    translation: "unbelievable/incredible",
    example1: "Das ist unglaublich!",
    sentenceTranslation1: "That's unbelievable!",
    example2: "Er hat eine unglaubliche Leistung erbracht.",
    sentenceTranslation2: "He achieved an incredible performance.",
    type: "adjective",
  },
  {
    german: "wichtig",
    meaning: "von großer Bedeutung",
    translation: "important",
    example1: "Das ist sehr wichtig.",
    sentenceTranslation1: "This is very important.",
    example2: "Es ist wichtig, pünktlich zu sein.",
    sentenceTranslation2: "It's important to be on time.",
    type: "adjective",
  },
  {
    german: "zusammenarbeiten",
    meaning: "gemeinsam an etwas arbeiten",
    translation: "to collaborate/to work together",
    example1: "Wir müssen zusammenarbeiten.",
    sentenceTranslation1: "We have to collaborate.",
    example2: "Sie arbeiten gut zusammen.",
    sentenceTranslation2: "They work well together.",
    type: "verb",
  },
  {
    german: "erklären",
    meaning: "etwas verständlich machen",
    translation: "to explain",
    example1: "Kannst du das erklären?",
    sentenceTranslation1: "Can you explain that?",
    example2: "Er hat es gut erklärt.",
    sentenceTranslation2: "He explained it well.",
    type: "verb",
  },
  {
    german: "ehrlich",
    meaning: "immer die Wahrheit sagen",
    translation: "honest",
    example1: "Sie ist immer ehrlich zu mir.",
    sentenceTranslation1: "She is always honest with me.",
    example2: "Ehrlichkeit ist wichtig in einer Beziehung.",
    sentenceTranslation2: "Honesty is important in a relationship.",
    type: "adjective",
  },
  {
    german: "hilfsbereit",
    meaning: "bereit zu helfen",
    translation: "helpful",
    example1: "Er ist immer sehr hilfsbereit.",
    sentenceTranslation1: "He is always very helpful.",
    example2: "Die Nachbarn sind sehr hilfsbereit.",
    sentenceTranslation2: "The neighbors are very helpful.",
    type: "adjective",
  },
  {
    german: "die Zufriedenheit /-en",
    meaning: "ein Gefühl des Glücks und der Ausgeglichenheit",
    translation: "satisfaction",
    example1: "Seine Zufriedenheit war deutlich zu spüren.",
    sentenceTranslation1: "His satisfaction was clearly noticeable.",
    example2: "Ich finde Zufriedenheit in kleinen Dingen.",
    sentenceTranslation2: "I find satisfaction in small things.",
    type: "noun",
  },
  {
    german: "der Unterschied /-e",
    meaning: "Merkmale, die Dinge voneinander abheben",
    translation: "difference",
    example1: "Es gibt einen großen Unterschied zwischen ihnen.",
    sentenceTranslation1: "There is a big difference between them.",
    example2: "Kennst du den Unterschied?",
    sentenceTranslation2: "Do you know the difference?",
    type: "noun",
  },
  {
    german: "die Verantwortung /-en",
    meaning: "Pflicht, sich um etwas zu kümmern",
    translation: "responsibility",
    example1: "Eltern tragen viel Verantwortung.",
    sentenceTranslation1: "Parents bear a lot of responsibility.",
    example2: "Die Verantwortung liegt bei dir.",
    sentenceTranslation2: "The responsibility lies with you.",
    type: "noun",
  },
  {
    german: "die Lösung /-en",
    meaning: "Antwort auf ein Problem oder eine Frage",
    translation: "solution",
    example1: "Wir müssen eine Lösung finden.",
    sentenceTranslation1: "We need to find a solution.",
    example2: "Hast du eine Lösung für dieses Problem?",
    sentenceTranslation2: "Do you have a solution for this problem?",
    type: "noun",
  },
  {
    german: "die Erfahrung /-en",
    meaning: "etwas, das man durch eigenes Tun gelernt hat",
    translation: "experience",
    example1: "Ich habe viel Erfahrung in diesem Bereich.",
    sentenceTranslation1: "I have a lot of experience in this field.",
    example2: "Seine Erfahrung ist beeindruckend.",
    sentenceTranslation2: "His experience is impressive.",
    type: "noun",
  },
  {
    german: "die Flexibilität /-en",
    meaning: "die Fähigkeit, sich leicht anzupassen",
    translation: "flexibility",
    example1: "Flexibilität ist in diesem Job wichtig.",
    sentenceTranslation1: "Flexibility is important in this job.",
    example2: "Er zeigt große Flexibilität in seiner Arbeit.",
    sentenceTranslation2: "He shows great flexibility in his work.",
    type: "noun",
  },
  {
    german: "abgeschlossen",
    meaning: "etwas ist beendet",
    translation: "completed",
    example1: "Das Projekt ist endlich abgeschlossen.",
    example2: "Die Arbeiten sind schon abgeschlossen.",
    sentenceTranslation1: "The project is finally completed.",
    sentenceTranslation2: "The work has already been completed.",
    type: "adjective",
  },
  {
    german: "aufmerksam",
    meaning: "die Fähigkeit, Dinge genau zu beobachten",
    translation: "attentive",
    example1: "Sie ist immer sehr aufmerksam im Unterricht.",
    example2: "Er hat eine aufmerksame Beobachtungsgabe.",
    sentenceTranslation1: "She is always very attentive in class.",
    sentenceTranslation2: "He has an attentive eye for observation.",
    type: "adjective",
  },
  {
    german: "ausgezeichnet",
    meaning: "von hoher Qualität, hervorragend",
    translation: "excellent",
    example1: "Das Essen war ausgezeichnet.",
    example2: "Ihr Vortrag war ausgezeichnet.",
    sentenceTranslation1: "The food was excellent.",
    sentenceTranslation2: "Her presentation was excellent.",
    type: "adjective",
  },
  {
    german: "behaupten",
    meaning: "etwas als wahr sagen, ohne Beweise",
    translation: "to claim",
    example1: "Er behauptet, der Beste zu sein.",
    example2: "Sie behauptet, die Wahrheit zu kennen.",
    sentenceTranslation1: "He claims to be the best.",
    sentenceTranslation2: "She claims to know the truth.",
    type: "verb",
  },
  {
    german: "bewusst",
    meaning: "etwas mit voller Aufmerksamkeit tun",
    translation: "conscious",
    example1: "Ich bin mir meiner Verantwortung bewusst.",
    example2: "Seine bewusste Entscheidung war klug.",
    sentenceTranslation1: "I am conscious of my responsibility.",
    sentenceTranslation2: "His conscious decision was wise.",
    type: "adjective",
  },
  {
    german: "einzigartig",
    meaning: "sehr besonders, anders als alle anderen",
    translation: "unique",
    example1: "Dieses Design ist wirklich einzigartig.",
    example2: "Jeder Mensch ist einzigartig.",
    sentenceTranslation1: "This design is truly unique.",
    sentenceTranslation2: "Every person is unique.",
    type: "adjective",
  },
  {
    german: "erheblich",
    meaning: "deutlich, signifikant",
    translation: "significant",
    example1: "Es gab erhebliche Fortschritte.",
    example2: "Sein Beitrag war erheblich.",
    sentenceTranslation1: "There were significant advances.",
    sentenceTranslation2: "His contribution was significant.",
    type: "adjective",
  },
  {
    german: "fortschrittlich",
    meaning: "modern und innovativ",
    translation: "progressive",
    example1: "Das Unternehmen verfolgt eine fortschrittliche Technologie.",
    example2: "Er hat eine fortschrittliche Sicht auf die Zukunft.",
    sentenceTranslation1: "The company follows a progressive technology.",
    sentenceTranslation2: "He has a progressive view of the future.",
    type: "adjective",
  },
  {
    german: "genießen",
    meaning: "etwas mit Freude und Genuss machen",
    translation: "to enjoy",
    example1: "Ich genieße den Sonnenuntergang.",
    example2: "Wir genießen unser Wochenende.",
    sentenceTranslation1: "I enjoy the sunset.",
    sentenceTranslation2: "We enjoy our weekend.",
    type: "verb",
  },
  {
    german: "glaubwürdig",
    meaning: "etwas, dem man Vertrauen schenken kann",
    translation: "credible",
    example1: "Seine Aussagen waren glaubwürdig.",
    example2: "Du bist ein sehr glaubwürdiger Zeuge.",
    sentenceTranslation1: "His statements were credible.",
    sentenceTranslation2: "You are a very credible witness.",
    type: "adjective",
  },
  {
    german: "herausfordern",
    meaning: "zu einer Aktion oder Leistung anregen",
    translation: "to challenge",
    example1: "Er fordert mich zu einem Wettkampf heraus.",
    example2: "Dieses Problem wird dich herausfordern.",
    sentenceTranslation1: "He challenges me to a competition.",
    sentenceTranslation2: "This problem will challenge you.",
    type: "verb",
  },
  {
    german: "hochmodern",
    meaning: "sehr neu und modern",
    translation: "highly modern",
    example1: "Das Gebäude ist hochmodern.",
    example2: "Das Büro ist hochmodern ausgestattet.",
    sentenceTranslation1: "The building is highly modern.",
    sentenceTranslation2: "The office is equipped in a highly modern way.",
    type: "adjective",
  },
  {
    german: "intensiv",
    meaning: "sehr stark und tiefgehend",
    translation: "intense",
    example1: "Er hat ein intensives Training gemacht.",
    example2: "Sie haben intensive Diskussionen geführt.",
    sentenceTranslation1: "He did an intense workout.",
    sentenceTranslation2: "They had intense discussions.",
    type: "adjective",
  },
  {
    german: "kritisieren",
    meaning: "etwas negativ beurteilen",
    translation: "to criticize",
    example1: "Er hat den Vorschlag kritisiert.",
    example2: "Ich möchte diese Entscheidung nicht kritisieren.",
    sentenceTranslation1: "He criticized the proposal.",
    sentenceTranslation2: "I don't want to criticize this decision.",
    type: "verb",
  },
  {
    german: "leiden",
    meaning: "etwas Schlechtes erleben, Schmerz erfahren",
    translation: "to suffer",
    example1: "Viele Menschen leiden unter der Krankheit.",
    example2: "Er leidet an einer schweren Allergie.",
    sentenceTranslation1: "Many people suffer from the disease.",
    sentenceTranslation2: "He suffers from a severe allergy.",
    type: "verb",
  },
  {
    german: "langfristig",
    meaning: "auf lange Sicht",
    translation: "long-term",
    example1: "Wir planen langfristige Ziele.",
    example2: "Diese Investition ist langfristig profitabel.",
    sentenceTranslation1: "We are planning long-term goals.",
    sentenceTranslation2: "This investment is long-term profitable.",
    type: "adjective",
  },
  {
    german: "natürlich",
    meaning: "authentisch, echt, ohne künstliche Veränderungen",
    translation: "natural",
    example1: "Sie sieht ganz natürlich aus.",
    example2: "Es ist wichtig, natürliche Produkte zu verwenden.",
    sentenceTranslation1: "She looks completely natural.",
    sentenceTranslation2: "It is important to use natural products.",
    type: "adjective",
  },
  {
    german: "rational",
    meaning: "mit Verstand und Logik handeln",
    translation: "rational",
    example1: "Er trifft immer rationale Entscheidungen.",
    example2: "Seine Argumente sind sehr rational.",
    sentenceTranslation1: "He always makes rational decisions.",
    sentenceTranslation2: "His arguments are very rational.",
    type: "adjective",
  },
  {
    german: "schwierig",
    meaning: "etwas, das nicht einfach zu tun ist",
    translation: "difficult",
    example1: "Diese Aufgabe ist wirklich schwierig.",
    example2: "Es ist schwierig, eine Entscheidung zu treffen.",
    sentenceTranslation1: "This task is really difficult.",
    sentenceTranslation2: "It is difficult to make a decision.",
    type: "adjective",
  },
  {
    german: "selbstverständlich",
    meaning: "etwas, das keine Erklärung benötigt",
    translation: "self-evident",
    example1: "Es ist selbstverständlich, dass wir uns helfen.",
    example2: "Selbstverständlich werde ich dir helfen.",
    sentenceTranslation1: "It is self-evident that we help each other.",
    sentenceTranslation2: "Of course, I will help you.",
    type: "adjective",
  },
  {
    german: "sicherstellen",
    meaning: "für Sicherheit sorgen",
    translation: "to ensure",
    example1: "Wir müssen sicherstellen, dass alles klappt.",
    example2: "Er hat alles gut sichergestellt.",
    sentenceTranslation1: "We must ensure that everything works out.",
    sentenceTranslation2: "He ensured everything was well done.",
    type: "verb",
  },
  {
    german: "unabhängig",
    meaning: "nicht von anderen abhängig",
    translation: "independent",
    example1: "Er ist finanziell unabhängig.",
    example2: "Ich möchte unabhängig arbeiten.",
    sentenceTranslation1: "He is financially independent.",
    sentenceTranslation2: "I want to work independently.",
    type: "adjective",
  },
  {
    german: "verantwortungsvoll",
    meaning: "mit großer Verantwortung handeln",
    translation: "responsible",
    example1: "Sie ist sehr verantwortungsvoll in ihrem Job.",
    example2: "Er hat eine verantwortungsvolle Position.",
    sentenceTranslation1: "She is very responsible in her job.",
    sentenceTranslation2: "He holds a responsible position.",
    type: "adjective",
  },
  {
    german: "widersprechen",
    meaning: "etwas ablehnen oder entgegnen",
    translation: "to contradict",
    example1: "Ich muss dir widersprechen.",
    example2: "Er hat ihrem Vorschlag widersprochen.",
    sentenceTranslation1: "I must contradict you.",
    sentenceTranslation2: "He contradicted her suggestion.",
    type: "verb",
  },
  {
    german: "zuverlässig",
    meaning: "jemand, dem man vertrauen kann",
    translation: "reliable",
    example1: "Er ist ein sehr zuverlässiger Mitarbeiter.",
    example2: "Sie ist bekannt für ihre zuverlässige Arbeit.",
    sentenceTranslation1: "He is a very reliable employee.",
    sentenceTranslation2: "She is known for her reliable work.",
    type: "adjective",
  },
  {
    german: "verstehen",
    meaning: "die Bedeutung von etwas erkennen",
    translation: "to understand",
    example1: "Ich verstehe, was du meinst.",
    example2: "Hast du das Konzept verstanden?",
    sentenceTranslation1: "I understand what you mean.",
    sentenceTranslation2: "Did you understand the concept?",
    type: "verb",
  },
];
const color: Colors[] = [
  {
    noun: "text-rose-600",
    verb: "text-green-600",
    adjective: "text-blue-700",
    adverb: "text-purple-700",
  },
];
const Flashcard: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  useEffect(() => {
    loadNewWord();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent page scrolling on space press
        loadNewWord();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const loadNewWord = () => {
    if (words.length === 0) {
      setCurrentWord(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];

    setCurrentWord(selectedWord);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {currentWord ? (
        <div
          className="flex flex-col justify-center items-center bg-white shadow-lg rounded-xl sm:p-10 p-7 h-[80%] sm:w-[80%] w-[100%] text-center cursor-pointer"
          onClick={loadNewWord}
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-4 ${
              color[0][currentWord.type]
            }`}
          >
            {currentWord.german}
            <span className="text-base sm:text-lg text-gray-500 italic">
              ({`${currentWord.translation}`})
            </span>
            <span className="text-base sm:text-lg text-gray-300 italic">
              {" "}
              {`${currentWord.type}`}{" "}
            </span>
          </h2>
          <p className="mb-2 text-gray-400 italic text-sm sm:text-base">
            {currentWord.meaning}
          </p>
          <p className="text-lg sm:text-xl mt-2 text-gray-600 italic font-bold">
            {currentWord.example1}
          </p>
          <p className="text-sm sm:text-md text-gray-300 italic font-medium">
            ({currentWord.sentenceTranslation1})
          </p>
          <p className="text-lg sm:text-xl mt-2 text-gray-600 italic font-semibold">
            {currentWord.example2}
          </p>
          <p className="text-sm sm:text-md text-gray-300 italic font-medium">
            ({currentWord.sentenceTranslation2})
          </p>
        </div>
      ) : (
        <p className="text-lg sm:text-xl">No more words for today!</p>
      )}
    </div>
  );
};

export default Flashcard;