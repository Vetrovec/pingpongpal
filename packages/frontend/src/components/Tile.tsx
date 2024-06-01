interface TileProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Tile({ className, children }: TileProps) {
  return (
    <div className={`border border-border p-4 bg-secondary ${className ?? ""}`}>
      {children}
    </div>
  );
}
