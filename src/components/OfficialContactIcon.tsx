import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const ICONS = {
  EMAIL: EmailIcon,
  PHONE: PhoneIcon,
  FACEBOOK: FacebookIcon,
} as const;

export const OFFICIAL_CONTACT_TYPE_LABELS: Record<keyof typeof ICONS, string> = {
  EMAIL: "Email",
  PHONE: "Número de Telefone",
  FACEBOOK: "Facebook",
};

export function OfficialContactIcon({
  type,
  ...props
}: { type: string } & SvgIconProps) {
  const Icon = ICONS[type as keyof typeof ICONS] ?? EmailIcon;
  return <Icon {...props} />;
}
