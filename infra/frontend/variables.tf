variable "aws_region" {
  description = "AWS region the frontend bucket lives in"
  type        = string
  default     = "us-west-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket hosting the frontend"
  type        = string
  default     = "lazy-lunch-league"
}

variable "github_repo" {
  description = "GitHub repo (owner/name) allowed to assume the deploy role via OIDC"
  type        = string
  default     = "b-rad-is-rad/lazy-lunch-league"
}
