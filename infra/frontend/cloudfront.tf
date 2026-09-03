data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "frontend" {
  enabled         = true
  is_ipv6_enabled = true
  http_version    = "http2"
  price_class     = "PriceClass_100"

  origin {
    domain_name = aws_s3_bucket_website_configuration.frontend.website_endpoint
    origin_id   = aws_s3_bucket_website_configuration.frontend.website_endpoint

    custom_origin_config {
      http_port                = 80
      https_port                = 443
      origin_protocol_policy    = "http-only"
      origin_ssl_protocols      = ["SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]
      origin_read_timeout       = 30
      origin_keepalive_timeout  = 5
    }
  }

  default_cache_behavior {
    target_origin_id       = aws_s3_bucket_website_configuration.frontend.website_endpoint
    viewer_protocol_policy = "https-only"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # dropin.lol was never renewed and is dead; the app is only reachable via
  # the default *.cloudfront.net domain now.
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
