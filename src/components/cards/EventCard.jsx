import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import dayjs from "dayjs";

const EventCard = ({ event, onBuy }) => {
  return (
    <Card sx={{ width: 350, maxWidth: "100%", boxShadow: "lg" }}>
      
      <CardOverflow>
        <AspectRatio minHeight="200px">
          <img
            src={
              event.image ||
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
            }
            loading="lazy"
            alt={event.name}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent>

        <Typography level="title-md">
          {event.name}
        </Typography>

        <Typography level="body-sm">
          {event.description}
        </Typography>

        <Typography level="body-sm" sx={{ mt: 1 }}>
          <CalendarMonthIcon fontSize="small" />{" "}
          {dayjs(event.date).format("DD/MM/YYYY")} - {event.time}
        </Typography>

        <Typography level="body-sm">
          <LocationOnIcon fontSize="small" /> {event.location}
        </Typography>

        <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
          MZN {event.precoNormal}
        </Typography>

        <Chip
          size="sm"
          variant="soft"
          color="success"
          sx={{ mt: 1 }}
        >
          VIP: MZN {event.precoVip}
        </Chip>

        <Typography level="body-sm" sx={{ mt: 1 }}>
          Lotação: {event.bilhetesVendidos || 0} / {event.lotacaoTotal}
        </Typography>

      </CardContent>

      <CardOverflow>
        <Button
          variant="solid"
          color="primary"
          size="lg"
          onClick={() => onBuy(event)}
        >
          Comprar Bilhete
        </Button>
      </CardOverflow>

    </Card>
  );
};

export default EventCard;