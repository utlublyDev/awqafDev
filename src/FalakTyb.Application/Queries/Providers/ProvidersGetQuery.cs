
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class ProvidersGetQuery : IRequest<Providers>
    {
        public long Id { get; set; }
    }
}
