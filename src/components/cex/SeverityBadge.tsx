import { Severity } from "./types";
import { useI18n } from "@/i18n/I18nContext";

const config: Record<Severity, { labelKey: string; className: string; bg: string }> = {
  high: { labelKey: "cexResults.severityHigh", className: "text-loss", bg: "bg-loss/15" },
  medium: { labelKey: "cexResults.severityMedium", className: "text-warning", bg: "bg-warning/12" },
  low: { labelKey: "cexResults.severityLow", className: "text-profit", bg: "bg-profit/12" },
};

interface Props {
  severity: Severity;
  labelOverride?: string;
}

const SeverityBadge = ({ severity, labelOverride }: Props) => {
  const { t } = useI18n();
  const c = config[severity];
  return (
    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${c.className} ${c.bg}`}>
      {labelOverride || t(c.labelKey)}
    </span>
  );
};

export default SeverityBadge;
