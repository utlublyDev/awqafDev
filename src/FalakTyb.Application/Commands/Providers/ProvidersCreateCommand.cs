
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersCreateCommand : IRequest<Providers>
    {
        public Providers Providers { get; set; }
    }
}
