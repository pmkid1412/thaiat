---
description: Record lessons learned from mistakes and corrections
---

# Record Lessons Learned

After ANY correction from the user or any bug encountered:

1. Open `tasks/lessons.md`

2. Add a new entry with this format:
```markdown
### N. Short description of the mistake
- **Mistake:** What went wrong
- **Fix:** How it was fixed
- **Rule:** A rule to prevent this in the future
```

3. Group entries by date:
```markdown
## YYYY-MM-DD: Context/Feature Name
```

4. Review existing lessons at session start for patterns

## Key Lessons To Always Remember

1. **Nginx DNS Cache**: Always `docker restart nginx` after Docker container rebuild
2. **PM2 restart timing**: Only restart investment microservice AFTER BE health check passes
3. **Docker cp is ephemeral**: Files copied into containers are lost on rebuild — use deploy workflow to re-copy
4. **SystemConfigCode whitelist**: When adding new config, grep ALL existing codes and add alongside them
5. **INTERNAL_SECRET**: Always read real secrets from running containers, never guess
6. **DTO validation**: NestJS `forbidNonWhitelisted: true` rejects any unknown fields in request body
7. **PaginationDto uses `pageSize`**: Not `limit` — always check actual DTO class
8. **Docker SSR needs internal URL**: Use `INTERNAL_API_URL=http://app:3000` for server-side fetches inside Docker
9. **CORS whitelist**: When adding new frontend domain, update `ALLOWED_ORIGINS` in backend `.env`
10. **API response shape**: Always read the backend service return statement before building frontend
11. **Telegram format**: Use HTML format (not markdown) when including dynamic content like commit messages
