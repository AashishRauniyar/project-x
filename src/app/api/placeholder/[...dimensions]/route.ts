import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  const { dimensions } = await params;
  
  if (!dimensions || dimensions.length === 0) {
    return new NextResponse('Missing dimensions', { status: 400 });
  }

  const [width, height] = dimensions[0].split('x').map(Number);
  
  if (!width || !height) {
    return new NextResponse('Invalid dimensions format. Use: /api/placeholder/300x200', { status: 400 });
  }

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        ${width}x${height}
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 