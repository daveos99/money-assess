// src/components/ReportDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import DejaVuSans from "../assets/fonts/DejaVuSans.ttf";
import { VERSION_LABEL } from "../config/version";
import { THEME_COLORS } from "../constants/colors";

// ✅ Register Unicode-safe font
Font.register({
  family: "DejaVuSans",
  src: DejaVuSans,
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "DejaVuSans",
    padding: 32,
    fontSize: 11,
    color: "#0f172a",
    backgroundColor: "#F8FAFC",
  },
  heroSection: {
    backgroundColor: "#312E81",
    borderRadius: 18,
    padding: 20,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  heroHeading: {
    fontSize: 22,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  heroSubheading: {
    fontSize: 12,
    color: "#E0E7FF",
    marginBottom: 2,
  },
  heroMeta: {
    fontSize: 11,
    color: "#C7D2FE",
  },
  heroStats: {
    flexDirection: "row",
    marginTop: 16,
  },
  heroStatBlock: {
    flexGrow: 1,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.2)",
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroStatValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 11,
    color: "#E0E7FF",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    color: "#1E3A8A",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    border: "1px solid #E2E8F0",
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.4,
    color: "#475569",
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  barLabel: { width: "30%", fontSize: 10, color: "#0f172a" },
  barTrack: {
    flexGrow: 1,
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
  },
  barFillWrapper: {
    height: 10,
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
  },
  barFill: {
    height: 10,
    borderRadius: 50,
  },
  barFillOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,184,166,0.35)",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 6,
    borderBottom: "1px solid #E2E8F0",
    marginBottom: 6,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottom: "1px solid #F1F5F9",
  },
  questionRowHighlight: {
    backgroundColor: "#FEF2F2",
  },
  questionText: { width: "70%", color: "#0f172a" },
  answerText: {
    width: "30%",
    textAlign: "right",
    color: "#0f172a",
  },
  topBarrierGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  themeBlock: {
    borderRadius: 12,
    border: "1px solid #E2E8F0",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  topBarrierList: {
    flexDirection: "column",
    gap: 6,
    marginTop: 12,
  },
  topBarrierRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  topBarrierBadge: {
    fontSize: 10,
    fontWeight: 700,
    color: "#6366F1",
    marginRight: 8,
    paddingTop: 2,
  },
  topBarrierText: {
    flex: 1,
    fontSize: 11,
    color: "#0f172a",
    lineHeight: 1.4,
  },
  ctaCard: {
    backgroundColor: "#0F766E",
    borderRadius: 16,
    padding: 18,
    marginTop: 4,
    color: "#FFFFFF",
  },
  ctaHeading: {
    fontSize: 14,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 11,
    color: "#ECFDF5",
    marginBottom: 10,
    lineHeight: 1.5,
  },
  ctaButton: {
    fontSize: 12,
    color: "#0F172A",
    textDecoration: "none",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    textAlign: "center",
    fontWeight: 700,
  },
  reasonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottom: "1px solid #E2E8F0",
  },
  reasonText: {
    width: "65%",
    color: "#0f172a",
  },
  reasonChip: {
    minWidth: 60,
    textAlign: "right",
    fontSize: 10,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: 700,
    color: "#0f172a",
  },
  reasonChipTrue: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  reasonChipSomewhat: {
    backgroundColor: "#FEF9C3",
    color: "#854D0E",
  },
  reasonChipFalse: {
    backgroundColor: "#E0F2FE",
    color: "#075985",
  },
  footerBar: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    borderRadius: 12,
    backgroundColor: "#1E293B",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 9,
    color: "#F1F5F9",
  },
});

export default function ReportDocument({ results }) {
  const {
    themes = [],
    overallPercent = 0,
    ratingForReport = "",
    reasons,
    preferredName = "",
    participantNames,
    participantType,
  } = results || {};

  const primaryName =
    typeof participantNames?.primary === "string"
      ? participantNames.primary.trim()
      : "";
  const partnerName =
    typeof participantNames?.partner === "string"
      ? participantNames.partner.trim()
      : "";
  const fallbackPreferred =
    typeof preferredName === "string" ? preferredName.trim() : "";
  const baseRecipientName = primaryName || fallbackPreferred;
  const showCoupleNames = participantType === "couple" && partnerName;
  const recipientName = showCoupleNames
    ? [baseRecipientName, partnerName].filter(Boolean).join(" & ")
    : baseRecipientName;
  const generationDate = new Date();
  const formattedDate = generationDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = generationDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  // Filter unanswered items
  const themesWithAnswers = themes
    .map((theme) => ({
      theme,
      answeredQuestions: (theme.questions || []).filter(
        (q) => q?.selectedLabel && q.selectedLabel !== "Not answered"
      ),
    }))
    .filter(({ answeredQuestions }) => answeredQuestions.length > 0);

  const answeredReasons = (reasons?.responses || []).filter((r) => {
    const ans = (r?.answer || "").trim();
    return ans === "True" || ans === "Somewhat True";
  });
  const hasTopThree = Array.isArray(reasons?.topThree) && reasons.topThree.length > 0;

  return (
    <Document>
      {/* ===== PAGE 1 ===== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.heroSection}>
          <Text style={styles.heroHeading}>Mastering Money Report</Text>
          {recipientName && (
            <Text style={styles.heroSubheading}>
              {`Prepared for ${recipientName}`}
            </Text>
          )}
          <Text style={styles.heroMeta}>{`${formattedDate} • ${formattedTime}`}</Text>
          <View style={styles.heroStats}>
            <View style={[styles.heroStatBlock, { marginRight: 12 }]}>
              <Text style={styles.heroStatValue}>{overallPercent}%</Text>
              <Text style={styles.heroStatLabel}>Overall Score</Text>
            </View>
            <View style={styles.heroStatBlock}>
              <Text style={styles.heroStatValue}>{ratingForReport}</Text>
              <Text style={styles.heroStatLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaHeading}>Do you want to get better at money?</Text>
          <Text style={styles.ctaText}>
            Reviewing your results with a money coach can help you define your next steps.
          </Text>
          <Link
            src="https://calendar.app.google/ZduxYZefWuWEY3F3A"
            style={styles.ctaButton}
          >
            Clich here to book a money chat with Dave - No cost or obligation
          </Link>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Theme Summary</Text>
          {themes.map((theme, index) => {
            const barColor = THEME_COLORS[index % THEME_COLORS.length];
            const width = Math.min(theme.percent, 100);
            return (
              <View key={theme.themeId} style={styles.barRow}>
                <Text style={styles.barLabel}>{theme.themeName}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFillWrapper,
                      { width: `${width}%` },
                    ]}
                  >
                    <View
                      style={[
                        styles.barFill,
                        {
                          backgroundColor: barColor,
                        },
                      ]}
                    />
                    <View style={styles.barFillOverlay} />
                  </View>
                </View>
                <Text style={{ width: 30, textAlign: "right", fontSize: 10 }}>
                  {theme.percent}%
                </Text>
              </View>
            );
          })}
        </View>

        {hasTopThree && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Your Top Barriers</Text>
            <View style={styles.topBarrierList}>
              {reasons.topThree.map((r, i) => (
                <View key={r.id} style={styles.topBarrierRow}>
                  <Text style={styles.topBarrierBadge}>{`#${i + 1}`}</Text>
                  <Text style={styles.topBarrierText}>{r.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {!!themesWithAnswers.length && (
          <View style={styles.sectionCard} break>
            <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
            {themesWithAnswers.map(({ theme, answeredQuestions }, idx) => (
              <View key={theme.themeId} style={styles.themeBlock} wrap={false}>
                <View style={styles.questionHeader}>
                  <Text style={{ width: "70%", fontWeight: "bold" }}>
                    {`${theme.themeName} • ${theme.percent}%`}
                  </Text>
                  <Text
                    style={{
                      width: "30%",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    Answer (Score)
                  </Text>
                </View>

                {answeredQuestions.map((q) => {
                  const highlight =
                    typeof q.score === "number" && Number(q.score) === 0;
                  return (
                    <View
                      key={q.id}
                      style={[
                        styles.questionRow,
                        highlight && styles.questionRowHighlight,
                      ]}
                    >
                      <Text style={styles.questionText}>{q.text}</Text>
                      <Text style={styles.answerText}>
                        {q.selectedLabel} ({q.score})
                      </Text>
                    </View>
                  );
                })}

                {idx > 0 && idx % 3 === 0 && (
                  <View style={{ pageBreakAfter: "always" }} />
                )}
              </View>
            ))}
          </View>
        )}

        {answeredReasons.length > 0 && (
          <View style={styles.sectionCard} break>
            <Text style={styles.sectionTitle}>
              What's holding you back right now?
            </Text>
            {answeredReasons.map((r) => {
              const rankIndex = reasons?.topThree?.findIndex(
                (top) => top.id === r.id
              );
              const rankSuffix = rankIndex > -1 ? ` (#${rankIndex + 1})` : "";
              const answer = r.answer || "";
              const chipStyle =
                answer === "True"
                  ? styles.reasonChipTrue
                  : answer === "Somewhat True"
                  ? styles.reasonChipSomewhat
                  : styles.reasonChipFalse;
              return (
                <View key={r.id} style={styles.reasonRow}>
                  <Text style={styles.reasonText}>
                    {r.text}
                    {rankSuffix}
                  </Text>
                  <Text style={[styles.reasonChip, chipStyle]}>{answer}</Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.footerBar} fixed>
          <Text style={styles.footerText}>
            {`Mastering Money Assessment ${VERSION_LABEL}`}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
