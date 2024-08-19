export function parseEmailAddress(
  address: string,
  domains: string[],
): {
  isMember: boolean;
  slug: string | null;
  username: string | null;
  domain: string | null;
} {
  const lowerCaseAddress = address.toLowerCase();
  const parts = lowerCaseAddress.split('@');

  if (parts.length < 2) {
    return { isMember: false, slug: null, username: null, domain: null };
  }

  const slugPart = parts[0];
  const domainPart = parts.slice(1).join('@');
  const domainParts = domainPart.split('.');

  if (domainParts.length < 2) {
    return { isMember: false, slug: null, username: null, domain: null };
  }

  const tld = domainParts.pop()!;
  const mainDomain = domainParts.pop()!;
  const fullDomain = `${mainDomain}.${tld}`;

  if (!domains.includes(fullDomain)) {
    return { isMember: false, slug: null, username: null, domain: null };
  }

  if (domainParts.length === 0) {
    // Case 1: *@domain.tld
    return {
      isMember: false,
      slug: slugPart,
      username: null,
      domain: fullDomain,
    };
  } else {
    // Case 2: *@*.domain.tld
    return {
      isMember: true,
      slug: slugPart,
      username: domainParts.join('.'),
      domain: fullDomain,
    };
  }
}
