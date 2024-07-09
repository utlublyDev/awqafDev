using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ProvidersDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
